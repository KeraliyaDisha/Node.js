require("dotenv").config();
const express = require("express");
const l10n = require("./lang");
const multer = require('multer');
const fileupload = require("express-fileupload");
const app = express();
const Connect = require("./config/database");
Connect();
const PORT = process.env.PORT || 3000;



const upload = multer ({
    storage:multer.diskStorage({
      destination: function(req, file, cb){
        cb(null, "controllers/files")
      },
      filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + ".jpg")
      }
    })
  }).single("fileName");

app.post("/upload", upload, (req, res) => {
  res.send("file upload");
})

global.translate = l10n.t;
app.use(express.json());
app.use(l10n.enableL10NExpress);


app.use(fileupload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

const cloudinaryConnect = require("./config/cloudinary");
cloudinaryConnect();

const sendMail = require("./config/sendmail");
sendMail();

//routes
app.use("/api/file", require("./routes"));

//server activation

app.listen(PORT, () => {
  console.log(`App started at port number ${PORT}`);
});
