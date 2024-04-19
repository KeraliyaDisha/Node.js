require("dotenv").config();
const express = require("express");
const app = express();
const l10n = require("./language");

const PORT = process.env.PORT || 4000;

global.translate = l10n.t;
app.use(express.json());

app.use(l10n.enableL10NExpress);

app.use("/api", require("./routes"));

app.get("/", (req, res) => {
  res.send(`<h1>This is HOMEPAGE</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server Started successfully at ${PORT}`); //behavior
});
