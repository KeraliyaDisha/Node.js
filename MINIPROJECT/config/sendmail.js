require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendMail = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        from: process.env.MAIL_USER,
        to: payload.email,
        subject: payload.subject,
        text: payload.emailBody
      };
      const result = await transporter.sendMail(options);
      resolve(result.response);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = sendMail;
