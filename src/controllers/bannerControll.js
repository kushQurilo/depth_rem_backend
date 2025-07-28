const bannerModel = require("../models/bannerModel");
const bannerWithTitle = require("../models/bannerWithTitleModel");

// banner without title
exports.createBanner = async (req, res, next) => {
    try {
        const { imagePath } = req;
        const bannerImage = imagePath;
        if (!imagePath) {
            return res.status(404)
                .json({ message: "Image is required", success: false });
        }
        const upload = await bannerModel.create({ bannerImage });
        if (!upload) {
            return res.status(404)
                .json({ success: false, message: "failed to upload" });
        }
        return res.status(201)
            .json({ success: true, message: "banner uploaded successfully" });
    } catch (err) {
        return res.status(500)
            .json({
                success: false,
                message: err.message
            })
    }
}



exports.getBanner = async (req, res, next) => {
    try {
        const banner = await bannerModel.find();
        if (!banner) {
            return res.status(404)
                .json({ success: false, message: "No banner found" });
        }
        return res.status(200)
            .json({ success: true, banner });
    } catch (err) {
        return res.status(500)
            .json({
                success: false,
                message: err.message
            })
    }
}
// banner without title end...



//banner with title start...

exports.bannerWithTitle = async (req, res, next) => {
    try {
        const { imagePath } = req;
        const { title } = req.body;
        const bannerImage = imagePath
        if (!imagePath || !title) {
            return res.status(404)
                .json({ success: false, message: "Image and title are required" });
        };
        const banner = await bannerWithTitle.create({ bannerImage, bannerTitle: title });
        if (!banner) {
            return res.status(404)
                .json({ success: false, message: "failed to upload" });
        }
        return res.status(201)
            .json({ success: true, message: "banner uploaded successfully" });

    } catch (err) {
        return res.status(500)
            .json({
                success: false,
                message: err.message
            })
    }
}

// banner without title end...

exports.getBannerWithTitle = async (req, res, next) => {
    try {
        const banner = await bannerWithTitle.find();
        if (!banner) {
            return res.status(404)
                .json({ success: false, message: "No banners found" });
        }
        return res.status(200)
            .json({
                success: true,
                data: banner
            })
    } catch (err) {
        return res.status(500)
            .json({
                success: false,
                message: err.message
            })
    }
}
