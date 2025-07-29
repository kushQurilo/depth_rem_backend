const mongoose = require('mongoose');
const advocateSchema = mongoose.Schema({
    availableTime:{
        type:String,
        required:[true,'timing required']
    },
    closingTime:{
        type:String,
        required:[true,"closing timing required"]
    },
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'admin id required']
    }
})

const advocateModel = new mongoose.model('advocate',advocateSchema);
module.exports = advocateModel;