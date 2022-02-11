# **WEB APPLICATION : UberEats prototype uisng MERN Stack & Kafka**

## **CMPE273 Project : UberEats-Lab-2**

The is a prototype of the famous UberEats application, an online portal for food delivery or pickup
across varied locations throughout the world. Since, this application is just a prototype, it mainly
highlights the below functionalities-

1. A customer signs up on the application, creates user login, selects food items from a particular
   restaurant he/she wishes to order from, specifies a delivery or pickup mode, and places an
   order.
2. The restaurant owner also has a user account managing the restaurant profile, food menu,
   delivery systems, etc. accepts the order from the customer.
3. The life cycle of the order from ordered, being prepared at the restaurant till the time it is
   delivered, or pickup is updated by the restaurant and tracked by the customer.
4. Restaurants fulfill the order and sign it off to a delivery person.
5. Either the order is picked up by the customer or delivered by a delivery person to the customer.
6. Also, there is an action for both customer and restaurant owner to cancel the order before it is
   excepted by the restaurant.
7. The application also gives the records of all the past orders to both the customers as well as
   restaurant owners.
8. The customers are also able to record their profile details and a list of their favorite restaurants.

All the above main functionalities were incorporated by builiding a functional, user friendly and responsive application.

### System Architecture Design:

<img src="https://github.com/Archita22ind/CMPE273-UberEats-Lab-1/blob/main/glimpseofapp.png" width=50% height=50%>

### Few screen captures of the application:

<img src="https://github.com/Archita22ind/CMPE273-UberEats-Lab-1/blob/main/glimpseofapp.png" width=50% height=50%>

## Getting Started with the Github repository-

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
