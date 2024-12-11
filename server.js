"use strict";

const ConsumerService = require("./src/services/consumerQueue.service.js");
// ConsumerService.consumerToQueue(queueName)
//   .then(() => {
//     console.log(`Consumer started ${queueName}`);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

ConsumerService.consumeToQueueSuccess("notificationQueueProcess")
  .then(() => {
    console.log(`Consumer started for notificationQueueProcess`);
  })
  .catch((error) => {
    console.log("Error consumer service success: ", error);
  });

ConsumerService.consumeToQueueFailed("notificationQueueProcess")
  .then(() => {
    console.log(`Consumer started for notificationQueueProcess`);
  })
  .catch((err) => console.log(err));
