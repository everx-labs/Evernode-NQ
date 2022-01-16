const NotificationContract = {
    abi: {
        "ABI version": 2,
        "version": "2.1",
        "header": [
            "pubkey",
            "time",
            "expire"
        ],
        "functions": [
            {
                "name": "constructor",
                "inputs": [
                    {
                        "name": "pubkey",
                        "type": "uint256"
                    }
                ],
                "outputs": []
            },
            {
                "name": "get",
                "inputs": [],
                "outputs": [
                    {
                        "name": "text",
                        "type": "string"
                    }
                ]
            },
            {
                "name": "set",
                "inputs": [
                    {
                        "name": "text",
                        "type": "string"
                    }
                ],
                "outputs": []
            }
        ],
        "data": [],
        "events": [],
        "fields": [
            {
                "name": "_pubkey",
                "type": "uint256"
            },
            {
                "name": "_timestamp",
                "type": "uint64"
            },
            {
                "name": "_constructorFlag",
                "type": "bool"
            },
            {
                "name": "version",
                "type": "uint256"
            },
            {
                "name": "m_ownerPubkey",
                "type": "uint256"
            },
            {
                "name": "m_text",
                "type": "string"
            }
        ]
    },
    tvc: "te6ccgECFAEAAhkAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgBCSK7VMg4wMgwP/jAiDA/uMC8gsRBQQTAr7tRNDXScMB+GYh2zzTAAGOHYECANcYIPkBAdMAAZTT/wMBkwL4QuIg+GX5EPKoldMAAfJ64tM/AfhDIbnytCD4I4ED6KiCCBt3QKC58rT4Y9MfAfgjvPK50x8B2zzyPAoGA0rtRNDXScMB+GYi0NcLA6k4ANwhxwDjAiHXDR/yvCHjAwHbPPI8EBAGAzwgghAY9rV7uuMCIIIQPJHhxbrjAiCCEHhmdEu64wIMCQcDJjD4RvLgTPhCbuMA1NHbPNs88gAPCA0AJPhFIG6SMHDe+Eu68uBl+AD4bAJCMPhCbuMA+Ebyc9cN/5XU0dDT/9/RIPLgePgA+GvbPPIACg0CFu1E0NdJwgGKjoDiDwsCRnDtRND0BXD4anD4a4j4bIBA9A7yvdcL//hicPhjefhqiPhsExMDfjD4RvLgTPhCbuMA0ds8IY4nI9DTAfpAMDHIz4cgzo0EAAAAAAAAAAAAAAAACY9rV7jPFszJcPsAkTDi4wDyAA8ODQAy+Ez4S/hK+EP4QsjL/8s/z4PL/8v/zMntVAAE+EwANO1E0NP/0z/TADHT/9P/1NH4bPhr+Gr4Y/hiAAr4RvLgTAIK9KQg9KETEgAUc29sIDAuNTAuMAAA",
    code: "te6ccgECEQEAAewABCSK7VMg4wMgwP/jAiDA/uMC8gsOAgEQAr7tRNDXScMB+GYh2zzTAAGOHYECANcYIPkBAdMAAZTT/wMBkwL4QuIg+GX5EPKoldMAAfJ64tM/AfhDIbnytCD4I4ED6KiCCBt3QKC58rT4Y9MfAfgjvPK50x8B2zzyPAcDA0rtRNDXScMB+GYi0NcLA6k4ANwhxwDjAiHXDR/yvCHjAwHbPPI8DQ0DAzwgghAY9rV7uuMCIIIQPJHhxbrjAiCCEHhmdEu64wIJBgQDJjD4RvLgTPhCbuMA1NHbPNs88gAMBQoAJPhFIG6SMHDe+Eu68uBl+AD4bAJCMPhCbuMA+Ebyc9cN/5XU0dDT/9/RIPLgePgA+GvbPPIABwoCFu1E0NdJwgGKjoDiDAgCRnDtRND0BXD4anD4a4j4bIBA9A7yvdcL//hicPhjefhqiPhsEBADfjD4RvLgTPhCbuMA0ds8IY4nI9DTAfpAMDHIz4cgzo0EAAAAAAAAAAAAAAAACY9rV7jPFszJcPsAkTDi4wDyAAwLCgAy+Ez4S/hK+EP4QsjL/8s/z4PL/8v/zMntVAAE+EwANO1E0NP/0z/TADHT/9P/1NH4bPhr+Gr4Y/hiAAr4RvLgTAIK9KQg9KEQDwAUc29sIDAuNTAuMAAA",
    codeHash: "e3e2ba1906a6675f660ed0668b2968559e92451c2f80c5405a9306517d30e854",
};
module.exports = { NotificationContract };