const mongoose = require('mongoose');

// simple function create
const connectWithDb = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>
        console.log("DB connection is successful")
    )
    .catch((error)=>{
        console.log("Issue in DB connection"),
        console.error(error.manage),
        process.exit(1);
    });
}

module.exports = connectWithDb;