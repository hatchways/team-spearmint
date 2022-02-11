const mongoose = require("mongoose");

const dateOptions = {
    startTime: {
      type: Date, 
      required: [
        { validator: isDayActive, msg: 'A start time is required if this day is active!'},
        { validator: isValidTime, msg: 'The start time cannot be after the end time'}
      ]
    }, 
    endTime: {
      type: Date,
      required: [
        { validator: isDayActive, msg: 'A end time is required if this day is active!'},
        { validator: isValidTime, msg: 'The end time cannot be before the start time'}
      ]
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
  return this.startTime > this.endTime
}

const availabilitySchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Profile'
  },
  monday: dateOptions,
  tuesday: dateOptions,
  wednesday: dateOptions,
  thursday: dateOptions,
  friday: dateOptions,
  saturday: dateOptions,
  sunday: dateOptions,
});

availabilitySchema.pre('save', function(next) {
  let newTime = this.startTime
  
})

module.exports = Availability = mongoose.model("Availability", availabilitySchema);
