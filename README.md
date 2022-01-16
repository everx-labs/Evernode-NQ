# Evernode-NQ

This repository contains documents that describe the architecture of a solution for delivering encrypted messages from the blockchain to end-users.
The solution ensures that not only the “man-in-the-middle”, but also the Sender cannot find out the content of the message and match which smart contracts (for example, wallets) belong to which recipient.

To achieve this goal, the process of creating-encrypting and delivering messages was separated, and the following entities were introduced:
 
### Queue Provider
Queue Provider knows what to send (has access to the data) but it does not have any information about the real address of the recipient. It creates encrypted messages based on user-defined rules containing a list of addresses and message types (internal, external incoming or outgoing).

### Notification Provider
Notification Provider knows where to send (has delivery address, e.g. IP address, URL, email, APN ID, FCM ID, etc.) but has no knowledge of the data itself since it is encrypted.

There can be several types of notification providers depending on the type of recipient and transport (browser, http server, smartphones, email, etc.).

Schematically, the process can be represented as follows:
```
                           +-----------------+
User---> CONSTANT-HASH --->|      Queue      |
  |          RULES         |     Provider    |
  |                        +--------+--------+
  |                                 |
  |                           CONSTANT-HASH
  |                         ENCRYPTED-MESSAGE 
  |                                 | 
  |                        +-----------------+
  +---> CONSTANT-HASH ---->|   Notification  |  
      DELIVERY-ADDRESS     |    Provider     |
                           +-----------------+ 
                                    |
                            ENCRYPTED-MESSAGE
                           TO DELIVERY ADDRESS
 ```
Note that the user sends the same **CONSTANT-HASH** to both the Queue Provider and the Notification Provider. Using this CONSTANT-HASH, Notification Provider understands where to send a particular encrypted message. 
