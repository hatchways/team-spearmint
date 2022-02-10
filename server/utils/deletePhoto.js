const AWS = require('aws-sdk');
require('dotenv').config();

const deleteS3Object = async (key) => {
    return new Promise((resolve, reject) => {
        try {
            let s3bucket = new AWS.S3({
                accessKeyId: process.env.AWS_ID,
                secretAccessKey: process.env.AWS_KEY,
                Bucket: process.env.BUCKET_NAME,
            });
            var params = { Bucket: process.env.BUCKET_NAME, Key: key };
            s3bucket.deleteObject(params, function(err, data) {
                if (err) reject(err);
                else resolve(data); 
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = deleteS3Object;
