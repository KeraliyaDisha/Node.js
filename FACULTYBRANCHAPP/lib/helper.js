const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const fs = require("fs");
const saltRounds = 10;

const encrypt = {
  generatePassword: (password) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds)));
      } 
      catch (error) {
        reject(error);
      }
    });
  },
  comparePassword: (plainPassword, hashPassword) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(bcrypt.compareSync(plainPassword, hashPassword));
      } 
      catch (error) {
        reject(error);
      }
    });
  },
};

const jwt = {
  generateToken: (payload, expiresIn = "30d") => {
    const privateKey = fs.readFileSync(
      __dirname + "/../ssh/rsa.private.key",
      "utf-8"
    );
    const issuer = process.env.ISSUER || "icreate";
    return new Promise((resolve, reject) => {
      jsonwebtoken.sign(
        payload,
        privateKey,
        { issuer, algorithm: "RS256", expiresIn },
        function (err, token) {
          if (err) {
            reject(err);
          }
          resolve(token);
        }
      );
    });
  },

  verifyToken: (token) => {
    const publicKey = fs.readFileSync(
      __dirname + "/../ssh/rsa.public.key",
      "utf-8"
    );
    const issuer = process.env.ISSUER || icreate;
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(
        token,
        publicKey,
        { issuer, algorithms: "RS256" },
        function (err, decoded) {
          if (err) {
            reject(err);
          }
          resolve(decoded);
        }
      );
    });
  },
};

const validateHandler = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  return res.status(422).json({
    errors: result.array(),
  });
};

module.exports = { encrypt, validateHandler, jwt };
