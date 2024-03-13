const express = require("express");
const fileUploadRouter = express.Router();
const fileUpload = require('../controllers/fileUpload');

fileUploadRouter.post("/localFileUpload", fileUpload.localFileUpload);
fileUploadRouter.post("/imageUpload", fileUpload.imageUpload);
fileUploadRouter.post("/videoUpload", fileUpload.videoUpload);
fileUploadRouter.post("/imageSizeReducer", fileUpload.imageSizeReducer);
fileUploadRouter.post("/pdfUpload", fileUpload.pdfUpload);


module.exports = fileUploadRouter;
