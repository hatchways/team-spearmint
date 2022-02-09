const Profile = require("../models/Profile");
const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const router = express.Router()
const protect = require('../middleware/auth');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, file.originalname); 
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

router.post('/upload-image', upload.single('image'), function(req, res, next) {
  if (!req.file) {
    res.status(400).send("Trouble uploading image, please try again!")
  } else {
    Profile.findOne({ userId: req.user.id }, (error, currentProfile) => {
      if (!currentProfile) {
        res.status(404).send("Profile not found!")
      } else {
        currentProfile.photo = req.file.location

        currentProfile.save(function (error) {
          if (error) {
            res.status(500).send(error)
          } else {
            res.status(200).send("Image successfully uploaded and saved to profile!")
          }
        });
      }
    })
  }
});

module.exports = router;
