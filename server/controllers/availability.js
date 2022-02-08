const Availability = require("../models/Availability");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

// New routes for availability.
// /availability <- to create a schedule
// /availability/:scheduleId
// /availability/active <- This route should just get their active schedule
// /availability <- All availability schedule for the current signed in user.
// /availability/:scheduleId/activate <- This will set the active schedule id on the profile model for that pet sitter.

// @route POST /availability
// @desc create a schedule
// @access private
exports.createSchedule = asyncHandler(async (req, res, next) => {
    const schedule = req.body.schedule
   
    let newSchedule = new Availability({
      profileId: schedule.profileId,
      schedule: schedule.schedule
    })

    newSchedule.save((error, schedule) => {
      if(error){
        res.status(400)
        throw new Error(error)
      } else {
        res.status(201).send(schedule)
      }
    })
  });

  // @route GET /availability/:scheduleId
  // @desc get a specific schedule from a profile 
  // @access public
  exports.getSchedule = asyncHandler(async (req, res, next) => {
    const schedule = await Availability.findOne({ _id: req.params.scheduleId})

    if(!schedule){
      res.status(400)
      throw new Error("There is no schedule found!")
    } else {
      res.status(200).send(schedule)
    }
  })

  