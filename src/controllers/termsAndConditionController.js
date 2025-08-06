const termsAndConditonModel = require("../models/termsAndConditonModel");

exports.addTNC = async (req, res , next) => {
    try{
        const {content} = req.body;
        if(!content){
            return res.status(400)
            .json({success:false , message:"content missing"});
        }
        const insert = await termsAndConditonModel.create({content});
        if(!insert){
            return res.status(200)
            .json({success:false , message:"Failed to add TNC"});
        }
        return res.status(201)
        .json({
            success:true ,
            message:"TNC added successfully",
        })
    }catch(err){
        return res.status(500)
        .json({
            success:false,
            message:err.message,
            error:err
        })
    }
}