const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Profile'
  },
  schedule: {
    'monday' : {
      startTime: {
        type: Date
      }, 
      endTime: {
        type: Date
      },
      active: {
        type: Boolean,
        default: false 
      }
    }, 
    'tuesday' : {
      startTime: {
        type: Date
      }, 
      endTime: {
        type: Date
      },
      active: {
        type: Boolean,
        default: false 
      }
    }, 
    'wednesday' : {
      startTime: {
        type: Date
      }, 
      endTime: {
        type: Date
      },
      active: {
        type: Boolean,
        default: false 
      }
    }, 
    'thursday' : {
      startTime: {
        type: Date
      }, 
      endTime: {
        type: Date
      },
      active: {
        type: Boolean,
        default: false 
      }
    }, 
    'friday' : {
      startTime: {
        type: Date
      }, 
      endTime: {
        type: Date
      },
      active: {
        type: Boolean,
        default: false 
      }
    }, 
    'saturday' : {
      startTime: {
        type: Date
      }, 
      endTime: {
        type: Date
      },
      active: {
        type: Boolean,
        default: false 
      }
    }, 
    'sunday' : {
      startTime: {
        type: Date
      }, 
      endTime: {
        type: Date
      },
      active: {
        type: Boolean,
        default: false 
      }
    }
  },
  active: {
    type: Boolean, 
    default: false 
  }
});

module.exports = Availability = mongoose.model("availability", availabilitySchema);
