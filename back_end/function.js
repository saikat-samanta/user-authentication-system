import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.bizmail.yahoo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_ID, // generated ethereal user
    pass: process.env.EMAIL_PASS, // generated ethereal password
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});
///// bcrypt salting and hasing ///////
export async function passHasing(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    console.log(error);
  }
}
