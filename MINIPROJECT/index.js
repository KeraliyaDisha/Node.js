require("dotenv").config();
const express = require('express');
const app = express();
const l10n = require('./language')
const bodyParser = require('body-parser');
const ejs = require('ejs');

const PORT = process.env.PORT || 4000;

global.translate = l10n.t;

app.use(express.json());

app.use(l10n.enableL10NExpress);

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.send(`<h1>this is my homepage</h1>`)
})

app.use("/api", require('./routes'));

app.listen(PORT, () => {
    console.log(`Server is started at port number ${PORT}`);
})