const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_KEY
});

const uploadFile = (fileName) => {

    const fileContent = fs.readFileSync(fileName);

    const params = {
        Bucket: 'profile-pics1',
        Key: 'test_user', // maybe save as user name
        Body: fileContent
    };

    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        return data.Location
    });
};



uploadFile('puppy.jpeg')