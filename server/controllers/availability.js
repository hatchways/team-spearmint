const Availability = require("../models/Availability");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

// @route POST /availability
// @desc create a schedule
// @access private
exports.createSchedule = asyncHandler(async (req, res, next) => {
    const schedule = req.body.schedule
   
    let newSchedule = new Availability({
      profileId: schedule.profileId,
      schedule: schedule.schedule
    })

    let savedSchedule = await newSchedule.save()

    if(!savedSchedule){
      res.status(500)
      throw new Error("Schedule could not be created!")
    } else {
      res.status(201).send(savedSchedule)
    }
  });

  // @route GET /availability/:scheduleId
  // @desc get a specific schedule from a profile 
  // @access public
  exports.getSchedule = asyncHandler(async (req, res, next) => {
    const schedule = await Availability.findOne({ _id: req.params.scheduleId})

    if(!schedule){
      res.status(404)
      throw new Error("There is no schedule found!")
    } else {
      res.status(200).send(schedule)
    }
  })

  // @route GET /availability/active
  // @desc get a profiles active schedule
  // @access public

  exports.getActiveSchedule = asyncHandler(async (req, res, next) => {
    const activeSchedule = await Availability.find({ profile: req.query.profileId, active: true })
   
    res.status(200).send(activeSchedule)
  })

  //@route GET /availability
  //@desc get all schedules for this profile
  //@access public 

  exports.getAllSchedules = asyncHandler(async (req, res, next) => {
    const allSchedules = await Availability.find({ profileId: req.query.profileId})
    res.status(200).send(allSchedules)
  })

  //@route PATCH /availability/:scheduleId/activate
  //@desc set a schedule as active for a given profile
  //@access private

  exports.makeActiveSchedule = asyncHandler(async (req, res, next) => {
    const activeSchedule = await Availability.find({ profileId: req.query.profileId, active: true })

    if(activeSchedule.length !== 0){
      activeSchedule[0].active = false 
      activeSchedule[0].save()
    }
    const makeActiveSchedule = await Availability.findById(req.params.scheduleId)

    if(!makeActiveSchedule){
      res.status(404)
      throw new Error("Could not find an active schedule")
    } else {
      makeActiveSchedule.active = true 

      const savedSchedule = makeActiveSchedule.save()
  
      if(!savedSchedule){
        res.status(500)
        throw new Error("Schedule was not updated to active")
      } else {
        res.status(200).send(schedule)
      }
    }
  })

