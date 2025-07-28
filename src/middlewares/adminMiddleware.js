const jsonToken = require('jsonwebtoken'); 
exports.AuthMiddleWare = async(req, res, next)=>{
    try{
        const authToken = req.headers['authorization'].split(' ')[1]
        const adminInfo = jsonToken.verify(authToken,process.env.SecretKey);
        if(adminInfo){
            req.admin_id = adminInfo.adminId,
            req.role = adminInfo.role
            next();
        }else{
            res.json({ 
                status:"failed",
                message:"Authorization  failed"
            })
        }
    }catch(err){
        res.json({
            status:"failed",
            message:"Authentication failed",
            error:err
        })
    }
}