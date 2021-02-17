import express from "express";
import { auth } from "./../middleware.js";

const router = express.Router();

router.post("/", auth, (req, res) => {
  const user_id = req.auth_user;
  res.status(200).json({ msg: user_id });
});

export default router;
