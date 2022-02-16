const Profile = require("../models/Profile");
const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const router = express.Router()
const protect = require('../middleware/auth');
require('dotenv').config();
const deletePhoto = require("../utils/deletePhoto")

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

router.post('/upload-image/:id', upload.single('image'), async function(req, res, next) {
  if (!req.file) {
    res.status(400).send("Trouble uploading image, please try again!")
  } else {
    const profile = await Profile.findOne({ userId: req.params.id });

    if (!profile) {
      res.status(404).send("Profile not found")
    } else {
      profile.photo = req.file.location

      profile.save((error) => {
        if (error) {
          res.status(500).send(error)
        } else {
          res.status(200).send("Image successfully uploaded and saved to profile")
        }
      })
    }
  }
});

router.delete('/delete-image/:key', async function(req, res, next) {
    console.log(req)
  const profile = await Profile.findById(req.body.id);

  if(profile){
    profile.photo = null 
    profile.save(function (error) {
      if (error) {
        res.status(500).send(error)
      } else {
        deletePhoto(req.params.key)
        .then((resp) => {
          res.status(200).send('deleted')
        })
        .catch((error) => {
          res.status(500).send(error)
        })
      }
    });
  } else {
    res.status(400).send("Profile not found")
  }
})


module.exports = router;
