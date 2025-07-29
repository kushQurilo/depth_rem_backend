const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {type:String},
    email: {type:String},
    phone:{type:String},
    image:{type:String,default:".png"},
    role:{type:String,default:"user"}
})
const User = new mongoose.model('user', userSchema);
module.exports = User;