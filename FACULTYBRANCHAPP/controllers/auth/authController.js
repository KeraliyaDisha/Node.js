const { User } = require("../../models");
const { encrypt, jwt } = require("../../lib/helper");

const authController = {};

authController.signUp = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    const hashedPassword = await encrypt.generatePassword(password);

    let response = await User.create({
      userName,
      email,
      password: hashedPassword,
      role,
    });

    let userData = await response.save();

    return res.status(200).json({
      success: true,
      data: userData,
      message: translate("REGISTER"),
    });
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

authController.login = async (req, res) => {
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
      role: user.role,
    };
    if (await encrypt.comparePassword(password, user.password)) {
      let token = await jwt.generateToken(payload);
      user.token = token;
      delete user.password;
      return res.status(200).json({
        success: true,
        token,
        user,
        message: translate("LOGIN"),
      });
    } else {
      return res.status(403).json({
        message: translate("INCORRECT"),
      });
    }
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: translate("LOGIN_FAILURE"),
    });
  }
};

module.exports = authController;
