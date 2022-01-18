# This is an example of Notification contract management

You can:
 - Deploy user Notification contract
 - Encrypt and save user-defined rules
 - Read and decrypt user-defined rules
 - Clear user-defined rules


## PREREQUSITES
You need npm and node.js ver >= 12 to be installed

## Typical workflow:

### Step 1. Define your provider
 If you choose to subscribe on notifications without DeBot, you should somehow to find the ID and URL of your notification provider.
 One way to request [DeBot](https://ton-surf-alpha.firebaseapp.com/debot?address=0%3A640cb57d316400dd9df639c1a898f267a71e2fa018ba0132ef01104eb3fa86fd&net=devnet) for a list of available providers.

### Step 2. Create your notification rules
 2.1 Deploy user Notification contract.
 
 2.2 Encrypt and save user-defined rules.
     Every time you save rules in a contract, all previous rules are overwritten.
 

### Step 3. Send your provider the required information
   3.1 Get your hash from user-defined rules.   
   To do this you must read and decrypt them from the contract. See an example how to get a `hash` [here](src/main.js#L102)

   3.2 Make a POST request to your provider.
   In general, different providers may request different data, so what data you have to send depends on your provider.
   
   ```
    POST
    Body: hash=<HEX_STRING>&data=<BASE64_STRING>
    Content-Type: application/x-www-form-urlencoded
   ```
 The provider's response may contain a description of the next steps to activate the subscription

 3.3 Follow the steps in provider's answer
    
### Step 4. Unsubscribe from notifications  (optional) 
To unsubscribe from notifications, simply save in the notification contract an empty string as the rule.
