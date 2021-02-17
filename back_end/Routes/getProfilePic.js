import express from "express";
import { UserModel } from "./../schema.js";
import { auth } from "./../middleware.js";

const router = express.Router();

router.post("/", auth, (req, res) => {
  const user_id = req.auth_user;
  if (user_id) {
    UserModel.findById(user_id, (err, response) => {
      if (!err) {
        if (response.profile_pic) {
          res.status(200).json({
            msg: `http://localhost:5000/${response.profile_pic}`,
            username: response.username,
          });
        } else {
          res.status(200).json({ msg: "#", username: response.username });
        }
      } else {
        res.status(400).json({ msg: "can't found user" });
      }
    });
  }
});
export default router;
