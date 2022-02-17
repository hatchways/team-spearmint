
   
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

// @route PUT /profile/edit
// @desc edit user profile
// @access Public
exports.editProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ userId: req.user.id });

  if (!profile) {
    res.status(404);
    throw new Error("Profile doesn't exist");
  }
  profile.set(req.body);
  const updatedProfile = await profile.save();
  res.status(200).json({
    success: {
      profile: updatedProfile,
    },
  });
});

// @route GET /profile/load
// @desc Get user profile data
// @access Private
exports.loadProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ userId: req.user.id });
  
  if (!profile) {
    res.status(401);
    throw new Error("Profile not found!");
  }

  res.status(200).json({
    success: {
      profile: profile,
    },
  });
});

// @route GET /profiles  
// @desc Get user profiles
// @access Public

exports.loadProfiles = asyncHandler(async (req, res, next) => {
  const pet_sitters = await Profile.find({ accountType: 'pet_sitter', address: { $exists: true }, price: { $exists: true }})
    
    res.status(200).send({ profiles: pet_sitters})
});