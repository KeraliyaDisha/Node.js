const { body, param } = require("express-validator");
const product = require("../../models/product");

const productValidate = {};

productValidate.create = [
  body("categoryId")
    .trim()
    .notEmpty()
    .withMessage("REQUIRED", { var: "CategoryId" })
    .bail()
    .isMongoId()
    .withMessage(translate("ID")),
  body("title")
    .trim()
    .notEmpty()
    .withMessage("REQUIRED", { var: "product name" })
    .bail()
    .matches(/^[a-zA-Z ]*$/)
    .withMessage(translate("ONLY_CHARACTERS"))
    .custom(async (title) => {
      let Product = await product.findOne({ title });
      if (Product) {
        throw new Error(translate("EXISTS", { name: "Product" }));
      }
    }),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("REQUIRED", { var: "description" })
    .bail()
    .isLength({
      max: 50,
    })
    .withMessage(translate("LENGTH", { num: "50" })),
];

productValidate.paramId = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage(translate("MONGOID"))
    .bail()
    .isMongoId()
    .withMessage(translate("ID")),
];

module.exports = productValidate;
