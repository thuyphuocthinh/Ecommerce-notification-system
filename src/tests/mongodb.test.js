"use strict";

const mongoose = require("mongoose");
const connectString =
  "mongodb+srv://thuyphuocthinhtpt1:09122003@cluster0.j97zc.mongodb.net/ecommerce-tipsjs?retryWrites=true&w=majority&appName=Cluster0";

const TestSchema = new mongoose.Schema({
  name: String,
});
const Test = mongoose.model("Test", TestSchema);

describe("Mongoose connection", () => {
  let connection;
  // Connect to mongodb before all tests
  beforeAll(async () => {
    connection = await mongoose.connect(connectString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it("Should connect to mongodb", () => {
    expect(mongoose.connection.readyState).toBe(1);
  });

  it("Should create a new document", async () => {
    const newTest = new Test({ name: "New Test" });
    const result = await newTest.save();
    expect(result._id).toBeDefined();
  });

  it("should find a document from the database", () => {
    const foundTest = Test.findOne({ name: "New Test" });
    expect(foundTest).toBeDefined();
  });

  test("sum", () => {
    expect(1 + 2).toBe(3);
  });

  // Close the connection to mongodb after all tests
  afterAll(async () => {
    await mongoose.disconnect();
  });
});
