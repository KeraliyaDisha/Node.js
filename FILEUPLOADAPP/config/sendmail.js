const nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
  const sendMail = (options) => {
    options = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_SEND,
      subject: "new file uploaded on cloudinary",
      text: "file uploaded successfully",
    };
    return new Promise((resolve, reject) => {
      transporter.sendMail(options, (err, info) => {
        if (err) {
          reject(err);
          console.log(err);
        }
        resolve(info);
      });
    });
  };
  
  module.exports = sendMail;
  