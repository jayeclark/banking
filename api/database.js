import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const DB_URI = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;

export const db = async () => {
  let collections = {};
  let success = true;
  const mongoClient = new MongoClient(DB_URI);
  try {
    await mongoClient.connect();
    const data = mongoClient.db(DB_NAME);
    collections.customer = data.collection("customers");
    collections.account = data.collection("accounts");
    collections.user = data.collection("users");
    collections.transaction = data.collection("transactions");
  } catch (e) {
    success = false;
    console.error(err);
    process.exit();
  }

  return { success, collections }
}