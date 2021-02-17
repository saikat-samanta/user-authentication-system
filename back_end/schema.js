//jshint esversion:9
import mongoose from "mongoose";

/* connect with database */
mongoose
  .connect("mongodb://localhost:27017/user_registration", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

/////// defining schema ///////
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
  },
});

/////// define model //////
export const TempModel = mongoose.model("UserData", userSchema);
export const UserModel = mongoose.model("ActivateUserData", userSchema);
