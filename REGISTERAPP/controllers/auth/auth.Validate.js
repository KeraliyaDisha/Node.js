const { body } = require("express-validator");
const userModel = require("../../models/userModel");

const authValidate = {};

authValidate.login = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { var: "email" }))
    .bail()
    .isEmail()
    .withMessage(translate("VALID")),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { var: "password" }))
    .bail()
    .isStrongPassword()
    .withMessage(translate("STRONG_PASSWORD")),
];

authValidate.signup = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { var: "name" }))
    .bail()
    .matches(/^[a-zA-Z ]*$/)
    .withMessage(translate("ONLY_CHARACTERS")),
  body("email")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { var: "email" }))
    .bail()
    .isEmail()
    .withMessage(translate("VALID"))
    .bail()
    .custom(async (email) => {
      let User = await userModel.findOne({ email });
      if (User) {
        throw new Error(translate("EXISTS", { name: "email Id" }));
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { var: "password" }))
    .bail()
    .isStrongPassword()
    .withMessage(translate("STRONG_PASSWORD")),
  body("role")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { var: "role" })),
];

module.exports = authValidate;
