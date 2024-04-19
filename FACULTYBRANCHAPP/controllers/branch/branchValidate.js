const { body } = require("express-validator");
const { Branch } = require("../../models");

const branchValidate = {};

branchValidate.create = [
  body("branch_name")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { name: "Branch name" }))
    .bail()
    .matches(/^[a-zA-Z ]*$/)
    .withMessage(translate("ONLY_CHARACTERS"))
    .bail()
    .custom(async (branch_name) => {
      let Branch_name = await Branch.findOne({
        where: { branch_name: branch_name },
      });
      if (Branch_name) {
        throw new Error(translate("EXISTS", { name: "Branch name" }));
      }
    }),
  body("branch_code")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { name: "Branch code" }))
    .bail(),
];

module.exports = branchValidate;
