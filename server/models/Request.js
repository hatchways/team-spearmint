const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        sitter_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        location: {
            type: String,
            default: '',
        },
        start: {
            type: Date,
            required: true,
            default: Date.now,
        },
        end: {
            type: Date,
            required: true,
            default: () => Date.now() + 24*60*60*1000,
        },
        animalType: {
            type: String,
            enum: ['dog', 'cat', 'other'],
            required: true,
        },
        usefulInfo: {
            type: String,
            default: '',
        },
        accepted: {
            type: Boolean,
            default: false,
        },
        declined: {
            type: Boolean,
            default: false,
        },
        paid: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    }
);

module.exports = Request = mongoose.model("Request", requestSchema);