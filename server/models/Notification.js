const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["system", "event", "users", "message"],
            default: "system",
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        readAt: {
            type: Date,
            default: Date.now(),
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        recipientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Notification = mongoose.model("Notification", notificationSchema);
