import jwt from "jsonwebtoken";
import { UserModel } from "./schema.js";

export async function auth(req, res, next) {
  const token = req.headers["x-custom-auth_token"];
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    try {
      const userVarify = await UserModel.findById(decoded);
      req.auth_user = userVarify._id;
      next();
    } catch (err) {
      res.status(400).json({ msg: "No user Found" });
    }
  } catch (error) {
    res.status(400).json({ msg: "No Token Found" });
  }
}
