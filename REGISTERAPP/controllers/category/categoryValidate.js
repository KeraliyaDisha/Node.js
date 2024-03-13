const { body } = require("express-validator");
const category = require("../../models/category");
const { options } = require("./categoryRoutes");

const categoryValidate = {};

categoryValidate.create = [
  body("name")
    .trim()
    .bail()
    .notEmpty()
    .withMessage(translate("REQUIRED", { var: "Category name" }))
    .bail()
    .matches(/^[a-zA-Z ]*$/)
    .withMessage(translate("ONLY_CHARACTERS"))
    .custom(async (name) => {
      let Category = await category.findOne({ name });
      if (Category) {
        throw new Error(translate("EXISTS", { name: "Category" }));
      }
    }),
];

module.exports = categoryValidate;
