const { TonClient, signerKeys } = require('@tonclient/core')
const { libNode } = require('@tonclient/lib-node')
const { Account } = require('@tonclient/appkit')
const { NotificationContract } = require('./contracts/NotificationContract.js')
const GIVER_ABI = require('./contracts/giver.abi.json')

/*
 * Notification service public key. This is a constant that will not change.
 */
const SERVICE_PUBLIC_KEY = 'a36bf515ee8de6b79d30b294bbe7162f5e2a45b95ea97e4baebab8873492ee43'

const SDK_ENDPOINTS = [
    'https://eri01.net.everos.dev',
    'https://rbx01.net.everos.dev',
    'https://gra01.net.everos.dev',
]

/*
 * Your GIVER address and keys
 */
const giverAddress = '0:...'
const giverKeys = {
    secret: '86da...',
    public: '95c0...',
}

/*
 * Example if user-defined notification rules. New lines matter.
 * You can find provider IDs interactively with DeBot.
 */
const userInput = `
    ID=devnull
    -1:0000000000000000000000000000000000000000000000000000000000000000 all
     0:e79073de464cd464abcd297fc21ecf91aa829eb71e2ffa9e3a18e66ba7c74ba9 extIn	  
     0:1bdfca239afc999c8f99a9c1411af4bd229b4bece1506529d760f5fa1d7f4357 extIn, extOut, internal
`

;(async () => {
    try {
        TonClient.useBinaryLibrary(libNode)
        const client = new TonClient({ network: { endpoints: SDK_ENDPOINTS } })

        // Create Giver's account
        const giverAccount = new Account(
            { abi: GIVER_ABI },
            {
                client,
                address: giverAddress,
                signer: signerKeys(giverKeys),
            },
        )

        Account.setGiverForClient(client, {
            address: giverAddress,
            sendTo: (dest, value) =>
                giverAccount.run('sendTransaction', { dest, value, bounce: false }),
        })

        await main(client)
        console.log('Normal exit')
        process.exit(0)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
})()

async function main(client) {
    /*
     * Set `createNewContract` to
     *   - `true` if you have your own giver and want to deploy new notification contract or
     *   - `false` if you want to use already existing in `net.ton.dev` notification contract
     */
    const createNewContract = false

    // We need keys to manage the Notification contract
    const keys = createNewContract
        ? await client.crypto.generate_random_sign_keys()
        : {
              public: 'dcf21e1a41cd704417d1b0a3a9b1ebed18b1ccf4de461146f416c2693295cd05',
              secret: '4ea63655171b63836d5c71873c805e25025c1a4b4f82759f47abc2cd0ff40412',
          }
    /*
     * Construct Account instance.
     */
    const acc = new Account(NotificationContract, { client, signer: signerKeys(keys) })

    if (createNewContract) {
        console.log('Deploying new contract. \nAddress: %s,\nKeys %o', await acc.getAddress(), keys)
        await acc.deploy({
            initInput: { pubkey: '0x' + keys.public },
            useGiver: true,
        })
        console.log('OK')
    } else {
        console.log('Using existing contract. Address: %s', await acc.getAddress())
    }

    console.log('Save filter to contract')
    await SafeEncryptedFilter(userInput)

    /*
     * There is a small chance that the state of the contract will eventually update,
     * but not instantly, so here we are checking for its update in a loop.
     */
    console.log('Reading data from contract')
    for (;;) {
        const response = await acc.runLocal('get', {})
        const { decryptedHash, decryptedText } = await decryptContractData(
            response.decoded.output.text,
        )
        if (decryptedText === userInput) {
            console.log('OK. Decrypted data is correct')
            console.log('This hash %s should be sent to your Notification provider', decryptedHash)
            break
        } else {
            console.log('Waiting ...')
            const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms))
            await sleep(1000)
        }
    }

    console.log('Clear filters')
    await SafeEncryptedFilter('')

    return

    async function decryptContractData(encryptedText) {
        const { nonce, base64 } = JSON.parse(encryptedText)
        const { decrypted } = await client.crypto.nacl_box_open({
            encrypted: base64,
            nonce,
            secret: keys.secret,
            their_public: SERVICE_PUBLIC_KEY,
        })
        const str = Buffer.from(decrypted, 'base64').toString('utf-8')
        return { decryptedHash: str.substr(0, 64), decryptedText: str.substr(64) }
    }


    async function SafeEncryptedFilter(text) {
        /*
         * This is an important step when we encrypt subscription details with private 
         * user key and public Evernode-NQ service key, so that it is not possible 
         * to match the subscription details with user credentials
        */
        
        /*
         * To encrypt data with NaclBox we need to derive a special public key
         */
        const pk = (
            await client.crypto.nacl_box_keypair_from_secret_key({
                secret: keys.secret,
            })
        ).public

        /*
         * Generate random bytes for nonce
         */
        const { bytes } = await client.crypto.generate_random_bytes({ length: 24 })
        const nonce = Buffer.from(bytes, 'base64').toString('hex')

        /*
         * We need to generate some hash, utf-8 string {0-9a-f}{64}
         * This hash can be generated in different ways, the only prerequisite is that
         * its value must be constant for the same notification contract and
         * NOT disclose the address of the contract.
         */
        const { hash } = await client.crypto.sha256({ data: keys.secret })

        /*
         * Create base64 string for encryption concatinating hash and user input
         */
        const decrypted = Buffer.from(hash + text, 'utf-8').toString('base64')

        const { encrypted } = await client.crypto.nacl_box({
            nonce,
            decrypted,
            their_public: SERVICE_PUBLIC_KEY,
            secret: keys.secret,
        })
        /*
         * Save encrypted text together with nonce and public key in the notification contract
         */
        await acc.run('set', {
            text: JSON.stringify({ nonce, base64: encrypted, pub_key: pk }),
        })
    }
}
