const mongoose = require('mongoose');
const bannerSchema = mongoose.Schema({
    bannerImage: {
        type: String,
        default: ".png"
    },
    bannerTitle: {
        type: String,
        required: [true, "title required..."]
    }
});
const bannerWithTitle = new mongoose.model('bannerwithtitle', bannerSchema);
module.exports = bannerWithTitle;