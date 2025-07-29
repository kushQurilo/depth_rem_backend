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
    aadhar:{
        type:String,
        require:[true, 'Aadhar required']
    },
    pan:{
        type:String,
        required:[true,'Pan Card required']
    },
    status:{
        type:String,
        default:"pending"
    }
});
const KYCmodel = mongoose.model('kyc',kycSchema);
module.exports = KYCmodel;