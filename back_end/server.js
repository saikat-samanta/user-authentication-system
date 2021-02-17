import "dotenv/config.js";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel, TempModel } from "./schema.js";
import { transporter, passHasing } from "./function.js";
import secret from "./Routes/secret.js";
import profilePic from "./Routes/profilePic.js";
import getProfilePic from "./Routes/getProfilePic.js";

/* ********* using express *********** */
const port = process.env.PORT || 5000;
const app = express();

//////using middleware////////
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* *********setting static path********** */
app.use(express.static("my-uploads"));

////////signup route //////////
app.post("/signup", async (req, res) => {
  if (req.body.password === req.body.cpassword) {
    ///////new model object/////////
    const userData = new TempModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cpassword: req.body.cpassword,
    });

    const hashPassword = await passHasing(req.body.password);
    userData.cpassword = userData.password = hashPassword;
    userData
      .save()
      .then((data) => {
        const activationLink = `http://localhost:3000/account-activate/${data._id}`;
        transporter
          .sendMail({
            from: `"CrossWorld" <${process.env.EMAIL_ID}>`, // sender address
            to: [req.body.email, "saikatsamanta737@gmail.com"], // list of receivers
            subject: "Hello ✔", // Subject line
            html: `<a href=${activationLink}><button>Click Here to activate</button></a>`, // html body
          })
          .then((info) => {
            res
              .status(200)
              .json({ msg: "please open your email to activate your account" });
          })
          .catch((err) => {
            res.status(400).json({ msg: "Please try again" });
          });
      })
      .catch((err) => {
        res.status(400).json({ msg: `please try another email ${err}` });
      });
  } else {
    res.status(400).json({ msg: "password not match" });
  }
});

app.post("/account-activate/:id", (req, res) => {
  TempModel.findOne({ _id: req.params.id })
    .then((data) => {
      UserModel.insertMany([data])
        .then((response) => {
          const [userData] = response;
          res.status(200).json({ msg: "Your account is activated now" });
          TempModel.deleteOne({ _id: userData.id }, (err) => {
            console.log(err);
          });
        })
        .catch((err) => {
          res.status(400).json({ msg: "Sorry! please register again" });
        });
    })
    .catch(() => {
      res.status(400).json({ msg: "Sorry! please register again" });
    });
});

/////////login route/////////
app.post("/login", (req, res) => {
  UserModel.findOne({ email: req.body.email }, (err, response) => {
    if (response) {
      bcrypt.compare(req.body.password, response.password, (err, success) => {
        if (success) {
          const jwtToken = jwt.sign(
            { _id: response._id },
            process.env.JWT_SECRET
          );
          res
            .status(200)
            .header("auth", jwtToken)
            .json({
              access_Token: jwtToken,
              msg: `Successfully login ${response.username}`,
            });
        } else {
          res.status(401).json({ msg: `invalid credential` });
        }
      });
    } else {
      res.status(401).send({ msg: "Email is not registerd yet" });
    }
  });
});

/////////forgot password/////////
app.post("/forgot-password", (req, res) => {
  UserModel.findOne({ email: req.body.email }, (err, response) => {
    if (response) {
      const link = `http://localhost:3000/reset-password/${response._id}`;

      // send mail with defined transport object
      transporter
        .sendMail({
          from: `"CrossWorld" <${process.env.EMAIL_ID}>`, // sender address
          to: [req.body.email, "saikatsamanta737@gmail.com"], // list of receivers
          subject: "Hello ✔", // Subject line
          html: `<a href=${link}><button>Click Here</button></a>`, // html body
        })
        .then((info) => {
          res.status(200).json({ msg: "please open your email" });
        })
        .catch((err) => {
          res.status(400).json({ msg: "Please try again" });
        });
    } else {
      res.status(401).json({ msg: "Email not found" });
    }
  });
});

////////reset password////////
app.post("/reset-password/:id", async (req, res) => {
  const password = await passHasing(req.body.password);
  const cpassword = await passHasing(req.body.cpassword);
  UserModel.updateOne(
    { _id: req.params.id },
    { password, cpassword },
    (err, response) => {
      if (response) {
        res.status(200).json({ msg: "password updated" });
      } else {
        res.status(400).json({ msg: "please try again" });
      }
    }
  );
});

app.use("/secret", secret);
app.use("/profile-pic", profilePic);
app.use("/get-profile-pic", getProfilePic);

////// listen port//////////////
app.listen(port, () => {
  console.log(`listing port ${port}`);
});
