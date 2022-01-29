// const Profile = require("../models/Profile");
// const express = require("express");
// const asyncHandler = require("express-async-handler");
// const upload = require("../utils/uploadFile");
// const multer  = require('multer')
// const router = express.Router();
// const path = require('path');

// // @route POST /profile/upload
// // @desc Post user profile photo
// // @access Private

// const imageStorage = multer.diskStorage({
//     // Destination to store image     
//     destination: '../images', 
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
//       // file.fieldname is name of the field (image)
//       // path.extname get the uploaded file extension
//     }
//   });
  
//   const imageUpload = multer({
//     storage: imageStorage,
//     limits: {
//       fileSize: 10000000 // 1000000 Bytes = 1 MB
//     },
//     fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(png|jpg)$/)) { 
//          // upload only png and jpg format
//          return cb(new Error('Please upload a Image'))
//        }
//      cb(undefined, true)
//   }
//   }) 
  
//     router.post('/uploadPhoto', imageUpload.single('name'), (req, res) => {
//         console.log(req.file);
//         res.status(200).send(req.file)
//     }, (error, req, res, next) => {
//         res.status(400).send({ error: error.message })
//     })

// module.exports = router;

const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router()
const uploadFile = require("../utils/uploadFile");

// Image Upload
const imageStorage = multer.diskStorage({
    destination: 'images', // Destination to store image 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
        // file.fieldname is name of the field (image), path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000   // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {     // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})  

// For Single image upload
router.post('/uploadImage', imageUpload.single('image'), (req, res) => {
    // uploadFile(req.file)
    res.send(req.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


module.exports = router;

