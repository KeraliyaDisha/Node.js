const mongoose = require("mongoose");
// const sendMail = require('../config/sendmail');
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

// fileSchema.post("save", async function (doc) {
//   try {
//     console.log("DOC", doc);
    
//     const mailOptions = {
//       to: doc.email,
//       subject: "new file uploaded on cloudinary",
//       html: `<h2>hello</h2> <p>file uploaded view here: <a href="${doc.imgUrl}">${doc.imgUrl}</a> </p>`,
//     };
//     sendMail(mailOptions)
//     console.log("INFO", info);
//   } 
//   catch (error) {
//     console.error(error);
//   }
// });

module.exports = mongoose.model("File", fileSchema);
