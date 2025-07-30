const mongoose =  require('mongoose');
const EmiSchema = mongoose.Schema({
    principle:{
        type:Number,
        required:true,
    },
    NumberOFEmi:{
        type:Number,
        required:true,
    },
    EmiAmount:{
        type:Number,
        required:true
    },
    duedate:{
        type:String,
        required:true
    },
    loantype:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    loanId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    paid:{
        type:String,
        default:"pending"
    },
    paidEmis:{
        type:Number,
        default:0
    }
});

const EmiModel = new mongoose.model('emisettlement',EmiSchema);
module.exports = EmiModel;