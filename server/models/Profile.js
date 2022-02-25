const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'other',
  },
  address: {
    type: String,
    default: "",
  },
  telephone: {
    type: String,
    default: "",
  },
  birthday: {
    type: Date,
    default: null
  },
  photo: {
    type: String,
    default: "",
  },
  accountType: {
    type: String, 
    enum: ["pet_sitter", "pet_owner"],
    default: "pet_owner",
  }, 
  price: {
    type: Number,
    default: 15
  },
  caption: {
    type: String,
    default: 'Professional Dog Trainer'
  },
  coverPicture: {
    type: String,
    default: "https://book.gettimely.com/images/default-cover-image.jpg",
  },
  rate: {
    type: Number,
    default: 5,
  },
  gallery: {
    type: [String],
    default: [],
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);