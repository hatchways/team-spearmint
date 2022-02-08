const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        ownerName: {
            type: String,
            required: true,
            unique: true
        },
        ownerPhoto: {
            type: String,
            required: true,
        },
        sitterId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        sitterName: {
            type: String,
            required: true,
            unique: true
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