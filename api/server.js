import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// import auth
// import account
// import transaction
// import customer
import auth from "./routes/auth.js";
import user from "./routes/user.js";
import customer from "./routes/customer.js";
import account from "./routes/account.js";

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('build'));

app.use("/api/auth", auth);
app.use("/api/account", account);
app.use("/api/customer", customer);
app.use("/api/transaction", user);
app.use("/api/user", user);
app.use("/api/*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;