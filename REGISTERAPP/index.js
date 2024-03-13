require("dotenv").config();
const express = require("express"); //import express
const l10n = require("./lang");
const app = express();
// connect database
const registerConnect = require("./config/database");
registerConnect();

const PORT = process.env.PORT || 3000;
global.translate = l10n.t;

// middleware to parse json require
app.use(express.json());
app.use(l10n.enableL10NExpress); //this is for req  use syntax: req.t in which t is function

app.use("/api", require("./routes"));

// default router
app.get("/", (req, res) => {
  res.send(`<h1>This is  my REGISTERPAGE</h1>`);
});
// starts the server
app.listen(PORT, () => {
  console.log(`Server Started at Port no ${PORT}`); //behavior
});
