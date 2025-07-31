const mongoose = require('mongoose');
const DriUer = mongoose.Schema({
    id:{
        type: String
    },
    Name:{
        type: String
    },
    Gender:{
        type: String
    },
    Joinig_date:{
        type:String
    },
    Assigned_Advocated:{
        name:{type:String},
        phone:{type:String},
        gender:{type:String},
        image:{type:String}
    }
})