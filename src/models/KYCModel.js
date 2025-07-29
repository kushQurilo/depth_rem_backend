const mongoose = require('mongoose');
const kycSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'user missing']
    },
    name:{
        type:String,
        required:[true, 'name required']
    },
    Aadhar:{
        type:String,
        require:[true, 'Aadhar required']
    },
    Pan:{
        type:String,
        required:[true,'Pan Card required']
    },
    status:{
        type:String,
        default:"Pending"
    }
});
const KYCmodel = mongoose.model('kyc',kycSchema);
module.exports = KYCmodel;