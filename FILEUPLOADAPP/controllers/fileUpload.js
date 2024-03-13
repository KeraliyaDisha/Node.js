const { translate } = require("jm-ez-l10n");
const File = require("../models/fileModel");
const cloudinary = require("cloudinary").v2;
const fileUpload = {};

//localfileupload

fileUpload.localFileUpload = async (req, res) => {
  try {
    //fetch file
    const file = req.files.file;
    console.log("File ===>", file);
    //__dirname == current dir

    //server's path   //add .jpg
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    console.log("Path -->", path);

    // add path to the move function
    file.mv(path, (err) => {
      console.log(err);
    });
    res.json({
      success: true,
      message: translate("LOCAL_SERVER"),
    });
  } 
  catch (error) {
    console.log("not able to upload file on server");
    console.error(error); // Log the error if it occurs
  }
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}
async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  console.log("temp file path", file.tempFilePath);

  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// image upload
fileUpload.imageUpload = async (req, res) => {
  try {
    // data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    // validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("filetype:", fileType);

    if (isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: translate("FORMAT"),
      });
    }

    // file format supported
    console.log("file uploaded to folder Disha");
    const response = await uploadFileToCloudinary(file, "Disha");
    console.log(response);

    // entry in database
    const fileData = await File.create({
      name,
      tags,
      email,
      imgUrl: response.secure_url,
    });

    res.json({
      success: true,
      imgUrl: response.secure_url,
      message: translate("UPLOAD", {name: "image"}),
    });
  } 
  catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
      message:  translate("FAIL"),
    });
  }
};

fileUpload.videoUpload = async (req, res) => {
  try {
    // data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;
    console.log(file);

    // validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("filetype:", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: translate("FORMAT"),
      });
    }

    // file format supported
    console.log("file uploaded to folder Disha");
    const response = await uploadFileToCloudinary(file, "Disha");
    console.log(response);

    // entry in database
    const fileData = await File.create({
      name,
      tags,
      email,
      imgUrl: response.secure_url,
    });

    res.json({
      success: true,
      imgUrl: response.secure_url,
      message: translate("UPLOAD", {name: "video"}),
    });
  } 
  catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
      message:  translate("FAIL"),
    });
  }
};

fileUpload.imageSizeReducer = async (req, res) => {
  try {
    // data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    // validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("filetype:", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: translate("FORMAT"),
      });
    }

    // file format supported
    console.log("file uploaded to folder Disha");
    const response = await uploadFileToCloudinary(file, "Disha", 90);
    console.log(response);

    // entry in database
    const fileData = await File.create({
      name,
      tags,
      email,
      imgUrl: response.secure_url,
    });

    res.json({
      success: true,
      imgUrl: response.secure_url,
      message: translate("UPLOAD", {name: "image"}),
    });
  } 
  catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
      message:  translate("FAIL"),
    });
  }
};

fileUpload.pdfUpload = async (req, res) => {
  try {
    // data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.pdfFile;
    console.log(file);

    // validate
    const supportedTypes = ["pdf"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("fileType:", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: translate("FORMAT"),
      });
    }

    // file format supported
    const allowedFileSize = 2;
    if (pdfFile.size / (1024 * 1024) > allowedFileSize) {
      throw Error("File too large");
    }

    console.log("file uploaded to folder Disha");
    const response = await uploadFileToCloudinary(file, "Disha");
    console.log(response);

    const fileData = await File.create({
      name,
      tags,
      email,
      imgUrl: response.secure_url,
    });

    res.json({
      success: true,
      imgUrl: response.secure_url,
      message: translate("UPLOAD", {name: "pdfFile"}),
    });
  } 
  catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
      message: translate("FAIL"),
    });
  }
};

module.exports = fileUpload;
