## 1. General requirements:

Each notification provider must:

- have a public https endpoint to receive data from the user
- be registered in APNS/FCM service to send push notifications
  (optional, for PUSH notifications only) 
- be able to deliver notifications within a specified time period (for example, 1-24 hours)
  with re-delivery in case of errors

## 2. How to become a Notification provider 
 If your organisation wants to be a Notification provider
 [let us know](https://t.me/EkaterinaPantaz), and you'll get:

- FQDN of Kafka brokers to connect
- the name of topic created for your organization
- your credentials - username and password

For each provider, a separate topic with two partitions and a message retention period of 8 hours
is created.

##  3. Check your setup
### 3.1 Check your credentials

```bash
$ kafkacat -C -b KAFKA_BROKER_FQDN:29092 \
            -t <TOPIC_NAME>
            -X security.protocol=sasl_plaintext \
            -X sasl.mechanisms=SCRAM-SHA-512 \
            -X sasl.username=<USERNAME> \
            -X sasl.password=<PASSWORD>
```

If you got access to your topic your set up is correct.

### 3.2 Subscribe to notifications on behalf of the user

For testing act as a user and configure your notification rules,
see: [“User's Manual”](./User-manual.md)

Make sure that your https endpoint has received POST from DeBot

```bash
 "Content-Type: application/x-www-form-urlencoded"
{ 
   hash: string,       // Use this hash to match message and recipient
   data: base64String  // Delivery address, e.g. recipient webhook url
}
```

### 3.3 Read notifications from Kafka topic

Use your preferred Kafka client and credentials to receive messages from Kafka,
SASL SCRAM-SHA-512 mechanism without SSL encryption is used.

Each Kafka message has:

   - key: type string, an idempotency key. 

     Messages with the same keys must be **deduplicated**.
     It is highly recommended to have a deduplication window of at least **48 hours**.
     
   - value: type string, contains `<hash> <nonce> <encodedMessage>`


### 3.4 Send notifications

- Create notification containing `"<nonce> <encodedMessage>"`
- Use `hash` to match the recipient and their delivery address
- Send notification to the user's device or site

## Appendix A.

### A.1 Subscribe to notifications without DeBot,

You can subscribe to notifications without DeBot, just using our SDK, but in this case there is
no guarantee that the sender will not be able to match the recipient and their contracts.

You can find a code example in
[notification-contract-management](./notification-contract-management) directory.
