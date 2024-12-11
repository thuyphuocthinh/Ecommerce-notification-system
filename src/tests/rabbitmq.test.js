"use strict";

const { connectToRabbitMQForTesting } = require("../dbs/init.rabbitmq");

describe("RabbitMQ connection", () => {
  test("Should connect to RabbitMQ", async () => {
    const { connection } = await connectToRabbitMQForTesting();
    expect(connection).toBeDefined();
  });
});
