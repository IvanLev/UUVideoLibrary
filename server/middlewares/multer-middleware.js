const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'storage/images')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
  }
});

const multerMiddleware = multer({storage}).single("file");

module.exports = multerMiddleware