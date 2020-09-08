import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

jest.mock("../nats-wrapper");

let mongo: any;

beforeAll(async () => {
  jest.clearAllMocks();
  process.env.JWT_KEY = "asdfasdf";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  //Build a JWT payload. {id, email}
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  //Create the jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //Build the object, {jwt: MY_JWT}
  const session = { jwt: token };

  //TURN THAT SEEION into JSON
  const sessionJSON = JSON.stringify(session);

  //Take JSON and encode into base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  //return a string that's the cookie with the encoded data
  return [`express:sess=${base64}`];
};
