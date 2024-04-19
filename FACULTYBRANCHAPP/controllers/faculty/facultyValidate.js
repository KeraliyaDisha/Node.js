const { body } = require("express-validator");
const { Faculty } = require("../../models");

const facultyValidate = {};

facultyValidate.create = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { name: "name of faculty" }))
    .bail()
    .custom(async (name) => {
      let Faculty_name = await Faculty.findOne({
        where: { name: name },
      });
      if (Faculty_name) {
        throw new Error(translate("EXISTS", { name: "Faculty" }));
      }
    }),
  body("main_subject")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { name: "subject" })),
  body("qualification")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { name: "Qualification of Faculty" })),
  body("experience")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { name: "experience of Faculty" })),
  body("branch_id")
    .trim()
    .notEmpty()
    .withMessage(translate("REQUIRED", { name: "branch_id" })),
];
module.exports = facultyValidate;
