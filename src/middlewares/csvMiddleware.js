const multer = require('multer');
const path = require('path');

// Define storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // use original file name
  }
});

// File filter (optional: only allow .csv files)
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.csv') {
    return cb(new Error('Only .csv files are allowed'), false);
  }
  cb(null, true);
};

const csvUpload = multer({ storage, fileFilter });

module.exports = csvUpload;