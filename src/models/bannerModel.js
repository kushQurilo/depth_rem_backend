const mongoose = require('mongoose');
const bannerSchema = mongoose.Schema({
    bannerImage:{
        type:String,
        default:".png"
    }
});
const bannerModel = new mongoose.model('banner',bannerSchema);
module.exports = bannerModel;