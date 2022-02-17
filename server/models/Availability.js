const mongoose = require("mongoose");

const dayOptions = {
    startTime: {
      type: Number, 
      required: [
        { validator: isDayActive, msg: 'A start time is required if this day is active!'},
        { validator: isValidTime, msg: 'The start time cannot be after the end time!'},
        { validator: isMin, msg: 'The start time cannot be less than zero minutes or greater than 1440 minutes!'},
      ], 
      default: 360 //6AM
    }, 
    endTime: {
      type: Number,
      required: [
        { validator: isDayActive, msg: 'A end time is required if this day is active!'},
        { validator: isValidTime, msg: 'The end time cannot be before the start time!'},
        { validator: isMax, msg: 'The end time cannot be greater than 1440 minutes or less than zero minutes!'},
      ], 
      default: 1260 //9PM
    },
    active: {
      type: Boolean,
      default: false, 
    }
}

function isDayActive(){
  return this.active === true
}

function isValidTime(){
  return this.startTime < this.endTime
}

function isMin(){
  return this.startTime > 0 && this.startTime < 1440
}

function isMax(){
  return this.endTime < 1440 && this.startTime > 0
}

const availabilitySchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Profile'
  },
  monday: dayOptions,
  tuesday: dayOptions,
  wednesday: dayOptions,
  thursday: dayOptions,
  friday: dayOptions,
  saturday: dayOptions,
  sunday: dayOptions,
});

module.exports = Availability = mongoose.model("Availability", availabilitySchema);
