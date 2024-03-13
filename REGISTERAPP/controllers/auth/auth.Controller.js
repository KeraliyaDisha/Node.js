const UserModel = require("../../models/userModel");
const { encrypt, jwt } = require("../../lib/helper");
const authController = {};
require("dotenv").config();

authController.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let hashedPassword = await encrypt.generatePassword(password);
    let response = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    let savedData = await response.save();
    
    return res.status(200).json({
      data: savedData,
      message: req.t("REGISTER"),
    });
  } 
  catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const User = await UserModel.findOne({ email });
    if (!User) {
      return res.status(404).json({
        success: false,
        message: translate("NOT_FOUND", { name: "user" }),
      });
    }

    const payload = {
      email: User.email,
      id: User._id,
      role: User.role,
    };

    // verify password and generate jwt token
    if (await encrypt.comparePassword(password, User.password)) {
      let token = await jwt.generateToken(payload);
      User.token = token;
      User.password = undefined;
      return res.status(200).json({
        token,
        User,
        message: translate("LOGIN"),
      });
    } 
    else {
      return res.status(403).json({
        message: translate("INCORRECT"),
      });
    }
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({
      message: translate("LOGIN_FAILURE"),
    });
  }
};

module.exports = authController;
