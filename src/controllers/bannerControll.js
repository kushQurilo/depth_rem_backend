const bannerModel = require("../models/bannerModel");
const bannerWithTitle = require("../models/bannerWithTitleModel");
const cloudinary = require('../utilitis/cloudinary');
const fs = require('fs');
// banner without title
exports.createBanner = async (req, res, next) => {
    try {
        const file = req.file;
        const hyperLink =req.body;
        if (!file) {
            return res.status(404)
                .json({ message: "Image is required", success: false });
        }
        const imagePath = file.path;
        const banner = await cloudinary.uploader.upload(imagePath, {
            folder: 'Banners',
        });
          fs.unlinkSync(imagePath);
        const upload = await bannerModel.create({ bannerImage: banner.secure_url,public_id:banner.public_id,hyperLink });
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
        const file = req.file;
        if (!file) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        const bannerImage = file.path;

        const banner = await cloudinary.uploader.upload(bannerImage, {
            folder: 'Banners'
        });

        fs.unlinkSync(bannerImage); // delete local file

        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ success: false, message: "Title is required" });
        }

        const bannerRes = await bannerWithTitle.create({
            bannerImage: banner.secure_url,
            bannerTitle: title
        });

        return res.status(201).json({
            success: true,
            message: "Banner uploaded successfully",
            data: bannerRes
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


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

exports.deleteBanner = async (req, res, next) => {
    try {
        const bannerId = req.params.id;
        const isBanner = await bannerModel.findById(bannerId);
        if (!isBanner) {
            return res.status(404)
                .json({ success: false, message: "Banner not found" });
        }
        await isBanner.deleteOne();
        return res.status(200)
            .json({ success: true, message: "Banner deleted successfully" });
    }
    catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: error.message
            })
    }
}


exports.deleteBannerWithTitle = async (req, res, next) => {
    try {
        const bannerId = req.params.id;
        const isBanner = await bannerWithTitle.findById(bannerId);
        if (!isBanner) {
            return res.status(404)
                .json({ success: false, message: "Banner not found" });
        }
        await isBanner.deleteOne();
        return res.status(200)
            .json({ success: true, message: "Banner deleted successfully" });
    }
    catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: error.message
            })
    }

}

exports.updateTitledBanner = async (req, res, next) => {
    try {
        const bannerId = req.params.id;
        const banner = req.body;
        const isBanner = await bannerWithTitle.findById(bannerId);
        if (!isBanner) {
            return res.status(404)
                .json({ success: false, message: "Banner not found" });
        }
        isBanner.bannerTitle = banner.title;
    }
    catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: error.message
            })
    }
}

//delete banner
exports.deleteBanner = async (req, res, next) => {
    try{
        const {public_id} = req.query
        const result = await cloudinary.uploader.destroy(public_id);
        if(result.result !=='ok'){
            return res.status(400)
            .json({
                success:false,
                message:"failed to delete image"
            })
        }
        await bannerModel.deleteOne({public_id})
        res.status(201)
        .json({
            success:true,
            message:"image deleted successfully"
        })
    }catch(error){
        return res.status(500)
        .json({
            success:false,
            message:error.message
        })
    }
}