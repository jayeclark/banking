import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import auth
// import account
// import transaction
// import customer
// import user

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use("/api/auth", "");
app.use("/api/account", "");
app.use("/api/customer", "");
app.use("/api/transaction", "");
app.use("/api/user", "");
app.use("*", (res) => res.status(404).json({ error: "not found" }));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));