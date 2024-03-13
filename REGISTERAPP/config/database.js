const { config } = require("dotenv");
const mongoose = require("mongoose");

require("dotenv").config();

// simple function create
const registerConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connection is successful"))
    .catch((error) => {
      console.log("Issue in DB connection"),
        console.error(error.manage),
        process.exit(1);
    });
};

module.exports = registerConnect;
