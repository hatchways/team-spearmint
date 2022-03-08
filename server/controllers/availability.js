const Availability = require("../models/Availability");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

// @route POST /availability
// @desc create a schedule
// @access private
exports.createSchedule = asyncHandler(async (req, res, next) => {
    const { name, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body.schedule
    const profile = await Profile.findOne({userId: req.user.id});
    if(!profile){
      res.status(404)
      throw new Error("There is no profile associated with this user!")
    } else {
      const newSchedule = new Availability({
        profileId: profile._id,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        name, 
      })
  
      const savedSchedule = await newSchedule.save()
  
      if(!savedSchedule){
        res.status(500)
        throw new Error("Schedule could not be created!")
      } else {
        res.status(201).send(savedSchedule)
      }
    }
  });

  // @route GET /availability/:scheduleId
  // @desc get a specific schedule from a profile 
  // @access public
  exports.getSchedule = asyncHandler(async (req, res, next) => {
    const schedule = await Availability.findOne({ _id: req.params.scheduleId})
    const profile = await Profile.findOne({userId: req.user.id});
    
    if(!schedule){
      res.status(404)
      throw new Error("There is no schedule found!")
    } else if(schedule.profileId === profile._id) {
      res.status(200).send(schedule)
    } else {
      res.status(401)
      throw new Error("You are unauthorized to take this action!")
    }
  })

  // @route GET /availability/active
  // @desc get a profiles active schedule
  // @access public

  exports.getActiveSchedule = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({userId: req.user.id});

    if(!profile){
      res.status(404)
      throw new Error("Profile not found!")
    } else {
      const activeSchedule = await Availability.find({ profile: profile._id, active: true })
   
      res.status(200).send(activeSchedule)
    }
  })

  //@route GET /availability/all
  //@desc get all schedules for this profile
  //@access public 

  exports.getAllSchedules = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({userId: req.user.id});

    if(!profile){
      res.status(404)
      throw new Error("Profile not found!")
    } else {
      const allSchedules = await Availability.find({ profileId: profile.id})
      res.status(200).send(allSchedules)
    }
  })

  //@route PATCH /availability/:scheduleId/activate
  //@desc set a schedule as active for a given profile
  //@access private

  exports.makeActiveSchedule = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({userId: req.user.id});

    if(!profile){
      res.status(404)
      throw new Error("Profile not found!")
      
    } else {
      const activeSchedule = await Availability.find({ profileId: profile._id, active: true })

      if(!activeSchedule.length){
        activeSchedule[0].active = false 
        activeSchedule[0].save()
      }
      const makeActiveSchedule = await Availability.findById(req.params.scheduleId)

      if(!makeActiveSchedule){
        res.status(404)
        throw new Error("Could not find an active schedule")

      } else {
        if(makeActiveSchedule.profileId.toString() === profile._id.toString()){

          makeActiveSchedule.active = true 
          
          const savedSchedule = await makeActiveSchedule.save()

          if(!savedSchedule){
            res.status(500)
            throw new Error("Schedule was not updated to active")
          } else {
            res.status(200).send(savedSchedule)
          }
        }
      }
      }
  })

