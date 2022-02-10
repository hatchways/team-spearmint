const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        sitterId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        start: {
            type: Date,
            required: true,
            default: Date.now,
            min: [new Date(), "Staring date should be greater or equal than today"],
        },
        end: {
            type: Date,
            required: true,
            default: () => Date.now() + 60 * 60 * 1000,
            validate: [dateValidator, "Start Date must be less than End Date"],
        },
        animalType: {
            type: String,
            enum: ["dog", "cat", "other"],
            required: true,
        },
        usefulInfo: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "declined", "completed"],
            default: "pending",
            lowercase: true,
            required: true,
        },
        paid: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

function dateValidator(value) {
    return this.start <= value;
}

module.exports = Request = mongoose.model("Request", requestSchema);
