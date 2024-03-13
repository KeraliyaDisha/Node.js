// load config from env file
require("dotenv").config();
const express = require("express"); //import express
const app = express(); //create app using the express framework
// conect database
const connectWithDb= require("./config/database");
connectWithDb();

const PORT = process.env.PORT || 3000;

// middleware to parse json require
app.use(express.json());

// import router for Todo API 
// mount the Todo routes
app.use("/api/v1",require("./routes/blog"));

// default router
app.get("/", (req,res) => {
    res.send(`<h1>This is  my HOMEPAGE</h1>`);
})
// starts the server
app.listen(PORT, () => {
    console.log(`Server Started at Port no ${PORT}`); //behavior
})

