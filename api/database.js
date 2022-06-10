import { MongoClient } from "mongodb";
import { DB_URI, DB_NAME } from "./services/helpers/environment.js";

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
  console.error(e);
  process.exit();
}

export default { success, collections };