# Evernode-NQ technical architecture

## **Basic principles:**

-   Evernode-NQ aggregates data from multiple data centers to ensure maximum data availability and consistency for notification generation.
-   Each message provider in the Kafka cluster has its own topic, for example provider with `id=1` has access to topic `notifications-1`.
-   Users save their subscription rules encrypted in their own notification contracts.

The generalized architecture of Evernode-NQ is shown in the diagram below:

![Evernode-NQ architecture](./pics/Evernode-NQ.svg)

## Key moments:

-   Evernode-NQ is deployed on a cluster consisting of several nodes (now their number is 3).
-   Apache Kafka MirrorMaker is used for data aggregation.
-   Notification filtering rules are periodically queried from user notification contracts.
-   Several running instances of the Kafka Streams application perform the following tasks
    -   deduplicates `message-*` topics
    -   filters messages according to the rules
    -   encrypts messages using the recipient's public key
    -   writes encrypted messages to providers' topics `notifications-*`
-   Providers have access to their own `notifications-*` topics using SCRAM-SASL authentication mechanism.
