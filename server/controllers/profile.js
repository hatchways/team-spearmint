

const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");
const { ResultWithContext } = require("express-validator/src/chain");

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

  const { id } = req.params;
  const profile = await Profile.findOne({ userId: id });
  if (!profile) {
    res.status(401);
    throw new Error("Profile not found!");
  }

  res.status(200).json({
    success: {
      profile: profile,
    }  
  });
});

const daysOfTheWeek = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
  7: 'sunday',
}
// @route GET /profiles/sitters?location=address&dates=date-range
// @desc Get user profiles
// @access Public
exports.loadProfiles = asyncHandler(async (req, res, next) => {
  let petSitters = await Profile.find({ accountType: 'pet_sitter', address: { $exists: true }, price: { $exists: true } })

  if (req.query.location !== 'undefined') {
    petSitters = petSitters.filter((sitter) => sitter.address.includes(req.query.location))
  }
  if (req.query.dates !== 'undefined') {
    const date = new Date(req.query.dates)
    const dayOfTheWeek = daysOfTheWeek[date.getDay()]

    const availabilities = await Availability.find()
    const availableProfiles = []
    availabilities.forEach((schedule) => {
      if (schedule[dayOfTheWeek].active) {
        availableProfiles.push(JSON.stringify(schedule.profileId))
      }
    })

    petSitters = petSitters.filter((sitter) => {
      let available = false
      availableProfiles.forEach((profileId) => {
        if (JSON.stringify(sitter._id) === profileId) {
          available = true
        } 
      })
      return available
    })
  }

  res.status(200).send({ profiles: petSitters })
});



