const multer  = require('multer');
require('dotenv').config();
const { CustomError } = require('./customError');
const { FieldSize } = require('../config/constants');
const UPLOAD_DIR = process.env.UPLOAD_DIR;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now().toString()}_${file.originalname}`)
    }
  });

const upload = multer({ storage: storage, limits: { fieldSize: FieldSize.limit },
      fileFilter: (req, file, cb) => {
          if (file.mimetype.includes('image')) {
              return cb(null, true)
          }
        cb(new CustomError(404, 'Wrong format for the Avatar'))
      }
 })

module.exports = upload;