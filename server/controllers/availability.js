const Availability = require("../models/Availability");
const asyncHandler = require("express-async-handler");


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