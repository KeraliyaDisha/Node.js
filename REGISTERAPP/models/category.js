const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    name:{
        type: String,
        require: true,
    },
    product:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }]
});

module.exports = mongoose.model("category", categorySchema);