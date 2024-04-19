const { body } = require("express-validator");
const db = require("../../models/index");
const User = db.User;
const authValidate = {};

authValidate.signUp = [
  body("userName")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { name: "userName" }))
    .bail()
    .matches(/^[a-zA-Z ]*$/)
    .withMessage(translate("ONLY_CHARACTERS")),
  body("email")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { name: "email" }))
    .bail()
    .isEmail()
    .withMessage(translate("VALID"))
    .bail()
    .custom(async (email) => {
      let user = await User.findOne({ where: { email: email } });
      if (user) {
        throw new Error(translate("EXISTS", { name: "email Id" }));
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { name: "password" }))
    .bail()
    .isStrongPassword()
    .withMessage(translate("STRONG_PASSWORD")),
  body("role")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { name: "role" })),
];

authValidate.login = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { name: "email" }))
    .bail()
    .isEmail()
    .withMessage(translate("VALID")),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { name: "password" }))
    .bail()
    .isStrongPassword()
    .withMessage(translate("STRONG_PASSWORD")),
];

module.exports = authValidate;
