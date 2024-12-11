"use strict";

const ConsumerService = require("./src/services/consumerQueue.service.js");
const queueName = "test-topic";
ConsumerService.consumerToQueue(queueName)
  .then(() => {
    console.log(`Consumer started ${queueName}`);
  })
  .catch((error) => {
    console.log(error);
  });
