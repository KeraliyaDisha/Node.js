const mongoose = require("mongoose");

require("dotenv").config();

const Connect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB connection is successful"))
    .catch((error) => {
      console.log("Issue in DB connection");
      console.error(error.message), process.exit(1);
    });
};

module.exports = Connect;
