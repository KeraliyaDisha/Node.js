const { User } = require("../../models");
const { encrypt, jwt } = require("../../lib/helper");
const sendMail = require("../../config/sendmail.js");

const userController = {};

userController.signUp = async (req, res) => {
  try {
    const { userName, email, password, role} = req.body;

    const hashedPassword = await encrypt.generatePassword(password);

    let userData = await User.create({
      userName,
      email,
      password: hashedPassword,
      role,
      status: "deactive"
    });

    const payload = {
      email,
    };

    let verificationToken = await jwt.generateToken(payload);

    sendMail({
      email,
      subject: "Confirm your email address",
      emailBody: `Click on this link to verify your email: http://localhost:3000/api/verify?token=${verificationToken}`,
    })
      .then((result) => {
        console.log("email sent:: ", result);
      })
      .catch((err) => {
        console.log("error when email sent:: ", err);
      });

    userData.set({ token: verificationToken });
    await userData.save();

    return res.status(200).json({
      success: true,
      data: userData,
      verificationToken: verificationToken,
      message: translate("REGISTER"),
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

userController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email }, raw: true });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: translate("NOT_FOUND", { name: "user" }),
      });
    }

    const payload = {
      email: user.email,
      id: user.id,
    };

    if (await encrypt.comparePassword(password, user.password)) {
      let token = await jwt.generateToken(payload);
      delete user.password;
      return res.status(200).json({
        success: true,
        token,
        user,
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
    return res.status(500).json({
      success: false,
      message: translate("LOGIN_FAILURE"),
    });
  }
};

userController.verify = async (req, res) => {
  try {
    let token = req.query.token;
    try {
      const decoded = await jwt.verifyToken(token);
      console.log(decoded);
      req.user = decoded;

      return res.render ('mailVerification')
    } 
    catch (error) {
      console.log("token missing error:: ", error);
    }
  } 
  catch (error) {
    console.log("error while we verifying:: ", error);
  }
};

module.exports = userController;
