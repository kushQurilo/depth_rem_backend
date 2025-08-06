const mongoose = require('mongoose');
const advocateSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    whatsappNumber:{
        type:Number,
        required:true
    },
    advocateImage:{
        type:String,
        default:"xyz.jpg"
    },
    date:{
        type:Date,
        default:Date.now()
    }
},{strict:false});
const advocateModel = new mongoose.model('advocate',advocateSchema);
module.exports = advocateModel;