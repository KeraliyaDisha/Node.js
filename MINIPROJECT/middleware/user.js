const { jwt } = require("../lib/helper");

const userMiddleware = async (req, res, next) => {
  try {
    console.log("header", req.header("Authorization"));
    let token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: translate("TOKEN"),
      });
    }

    token = token.replace("Bearer ", "");

    try {
      const decoded = await jwt.verifyToken(token);
      console.log(decoded);
      req.user = decoded;
    } 
    catch (error) {
      console.log(error);
      return res.status(401).json({
        success: false,
        message: translate("INVALID"),
      });
    }
    next();
  } 
  catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: translate("VERIFY"),
    });
  }
};

module.exports = userMiddleware;
