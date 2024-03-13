const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    title:{
        type: String,
        required: true,
    },
    description:{
       type: String,
       required: true
    },
    status:{
        type: Boolean,
        default:'Active'
    }
});
module.exports = mongoose.model("product", productSchema);