"use strict";

const { connectToRabbitMQ, consumerQueue } = require("../dbs/init.rabbitmq.js");

class ConsumerService {
  static consumerToQueue = async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      await consumerQueue(channel, queueName);
    } catch (error) {
      console.error("Error consumer queue: " + error.message);
    }
  };
}

module.exports = ConsumerService;
