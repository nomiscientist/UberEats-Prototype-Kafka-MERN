# **UberEats prototype with MERN Stack**

## **CMPE273-UberEats-Lab-2**

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

You will need Node.js installed on your machine.

To install Node.js on Mac:

`brew install nodejs`

To install Node.js on Linux:

`brew install nodejs`

To install kafka on Mac, download the binary file from below link:

https://www.apache.org/dyn/closer.cgi?path=/kafka/3.0.0/kafka_2.13-3.0.0.tgz

On local machine unpack the .tgz file and go to the kafka_2.13-3.0.0 folder from terminal

To start zookeeper:
bin/zookeeper-server-start.sh config/zookeeper.properties

To start Kafka server:
bin/kafka-server-start.sh config/server.properties

To create topic:
bin/kafka-topics.sh --create --topic <topicname> --partitions 1 --replication-factor 1 --bootstrap-server localhost:9092

(Script for topic creation provided)

## Installing

Clone the contents of the Git repository to your local:

Go into the Backend directory and run the following command:

`npm install`

Go into the Frontend directory and run the following command:

`npm install`

Go into the kafka-backend directory and run the following command:

`npm install`

To run the Backend, go into the Backend directory and run the following command:

`node app.js`

To run the Frontend, go into the Frontend directory and run the following command:

`export NODE_OPTIONS=--openssl-legacy-provider`
`npm start`

To run the kafka-backend, go into the kafka-backend directory and run the following command:

`node server.js`

To use the application, visit the following url from your browser: http://localhost:3000/
Before that change NODE_HOST to localhost in file /Users/archie/Documents/UberEats-Prototype-Kafka-MERN/Frontend/src/common/envConfig.js
