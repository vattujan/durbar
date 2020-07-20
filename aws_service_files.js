const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const path = require('path');
require('dotenv').config();

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET,
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + file.originalname)
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: (req, file, callback) => {
        var ext = path.extname(file.originalname);
        if (ext === ".pdf") {
            callback(null, true)
        } else {
            return callback(new Error("Only pdf files are allowed."))
        }
    }
});

module.exports = upload;
