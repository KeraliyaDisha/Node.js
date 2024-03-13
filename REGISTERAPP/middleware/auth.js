const { translate } = require("jm-ez-l10n");
const { jwt } = require("../lib/helper");

const authMiddleware = async (req, res, next) => {
  try {
    console.log("header", req.header("Authorization"));
    // extract token
    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: translate("TOKEN"),
      });
    }

    token = token.replace("Bearer ", "");
    
    // verify the token
    try {
      const decode = await jwt.verifyToken(token);
      console.log(decode);
      req.user = decode;
    } 
    catch (error) {
      console.log(error);
      return res.status(401).json({
        success: false,
        message: translate("INVALID"),
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: translate("verify"),
    });
  }
};

module.exports = authMiddleware;
