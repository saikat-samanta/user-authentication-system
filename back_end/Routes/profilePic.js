import express from "express";
import multer from "multer";
import { auth } from "./../middleware.js";
import { UserModel } from "./../schema.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "my-uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "avatar"
);

router.post("/", auth, (req, res) => {
  const user_id = req.auth_user;
  if (user_id) {
    upload(req, res, () => {
      if (req.file) {
        /* find by id and update on db */
        UserModel.findByIdAndUpdate(user_id, { profile_pic: req.file.filename })
          .then(() => {
            /* send successfully update status */
            res.status(200).json({ msg: "Profile pic updated successfully" });
          })
          .catch(() => {
            res.status(400).json({ msg: "Internal Server Error" });
          });
      } else {
        res.status(400).json({ msg: "try again" });
      }
    });
  }
});

export default router;
