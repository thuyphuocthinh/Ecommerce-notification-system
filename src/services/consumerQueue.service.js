"use strict";

const { connectToRabbitMQ, consumerQueue } = require("../dbs/init.rabbitmq.js");

class ConsumerService {
  static consumerToQueue = async (queueName) => {
    try {
      const { channel } = await connectToRabbitMQ();
      await consumerQueue(channel, queueName);
    } catch (error) {
      console.error("Error consumer queue: " + error.message);
    }
  };

  // case success TTL
  static consumeToQueueSuccess = async (queueName) => {
    try {
      const { channel } = await connectToRabbitMQ();
      // 1. TTL
      // const timeExpired = 15000;
      // setTimeout(async () => {
      //   await channel.consume(queueName, (msg) => {
      //     console.log(`Success processing message: ${msg.content.toString()}`);
      //     channel.ack(msg);
      //   });
      // }, timeExpired);

      // 2. LOGIC
      await channel.consume(queueName, (msg) => {
        try {
          const numberTest = Math.random();
          console.log(`Number test: ${numberTest}`);
          if (numberTest < 0.8) {
            throw new Error(`Send notification failed: HOT FIX`);
          }
          console.log(`Success processing message: ${msg.content.toString()}`);
          channel.ack(msg);
        } catch (error) {
          // console.log(`Error processing message: ${error}`);
          channel.nack(msg, false, false);
          /**
           * nack: negative acknowledgement
           * msg: error message due to error logic handling
           * false: message won't be requeued back to the original queue
           * false: only current message is rejected to the original queue
           */
        }
      });
    } catch (error) {
      console.error("Error consumer queue: " + error.message);
    }
  };

  // case failed TTL
  static consumeToQueueFailed = async (queueName) => {
    try {
      const { channel } = await connectToRabbitMQ();
      const notificationExchangeDLX = "notificationExchangeDLX";
      const notificationRoutingKeyDLX = "notificationRoutingKeyDLX";
      const notificationQueueHotFix = "notificationQueueHotFix";
      channel.assertExchange(notificationExchangeDLX, "direct", {
        durable: true,
      });
      const queueResult = await channel.assertQueue(notificationQueueHotFix, {
        exclusive: false,
      });
      await channel.bindQueue(
        queueResult.queue,
        notificationExchangeDLX,
        notificationRoutingKeyDLX
      );
      await channel.consume(
        queueResult.queue,
        (msgFailed) => {
          console.log(
            `This notification error, please hot fix:::${msgFailed.content.toString()}`
          );
        },
        {
          noAck: true,
        }
      );
    } catch (error) {
      console.error("Error consumer queue: " + error.message);
    }
  };
}

module.exports = ConsumerService;
