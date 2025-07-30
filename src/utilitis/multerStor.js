const multer = require('multer');

const cloudUploader = multer.memoryStorage()
const cloudinaryUploader  = multer({storage:cloudUploader})
module.exports = cloudinaryUploader;