import express from "express";
import controller from "../controllers/auth.js";

const router = express.Router();

router.route("/register")
  .post(controller.registerUser);

router.route("/forgot/username")
  .get(controller.remindUsername);

router.route("/forgot/password")
  .get(controller.initiatePasswordReset);

router.route("/reset/password")
  .post(controller.completePasswordReset);

router.route("/login")
  .post(controller.loginUser);

router.route("/logout")
  .get((req, res) => res.send("Invalid route"))
  .post(controller.logoutUser);

export default router;