const Profile = require("../models/Profile");
const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const   multerS3 = require('multer-s3');
const router = express.Router()
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, file.originalname); 
    }
  })
});

router.post('/uploadImage', upload.single('image'), function(req, res, next) {
  if (!req.file) {
    res.status(400).send("Trouble uploading image, please try again!")
  } else {
    Profile.findOne({ userId: req.body.id }, (error, currentProfile) => {
      if (!currentProfile) {
        res.status(400).send("Profile not found!")
      } else {
        currentProfile.photo = req.file.location

        currentProfile.save(function (error) {
          if (error) {
            res.status(400).send(error)
          } else {
            res.status(200).send("Image successfully uploaded and saved to profile!")
          }
        });
      }
    })
  }
});


module.exports = router;
