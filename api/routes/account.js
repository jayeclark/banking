import express from "express";
import controller from "../controllers/account.js";

const router = express.Router();

router.route("/")
  .post(controller.create)
  .get(controller.read)
  .put(controller.update)
  .delete(controller.del)

export default router;