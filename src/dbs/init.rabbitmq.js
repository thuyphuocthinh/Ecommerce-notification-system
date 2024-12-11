"use strict";
const amqplib = require("amqplib");

// Connect to RabbitMQ

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqplib.connect("amqp://localhost:5672");
    if (!connection) {
      console.log("Connection to RabbitMQ failed");
    }
    const channel = await connection.createChannel();
    return { channel, connection };
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
};

const connectToRabbitMQForTesting = async () => {
  try {
    const { channel, connection } = await connectToRabbitMQ();
    // publish message to a queue
    const queue = "test-queue";
    const message = "Hello, world!";
    channel.assertQueue(queue, { durable: true });
    await channel.sendToQueue(queue, Buffer.from(message));

    return connection;
  } catch (error) {
    console.log("Error connecting to RabbitMQ: " + error.message);
  }
};

const consumerQueue = async (channel, queue) => {
  try {
    await channel.assertQueue(queue, { durable: true });
    console.log("Waiting for message to be delivered");
    // consume messages
    channel.consume(
      queue,
      (msg) => {
        console.log(`Received message: ${msg.content.toString()}`);
        // 1. find user following the shop
        // 2. send message to user following
        // 3. yes, ok => success
        // 4. error => error, set up DLX session
      },
      { noAck: true }
    );
  } catch (error) {
    console.error("Error consuming from RabbitMQ:", error);
    throw error;
  }
};

module.exports = {
  connectToRabbitMQ,
  connectToRabbitMQForTesting,
  consumerQueue,
};


// channel khác gì với queue
// channel assertQueue là gì
// channel consume là gì
// DLE = dead letter exchanges
