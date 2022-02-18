const Notification = require("../models/Notification");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.createNotification = asyncHandler(async (req, res, next) => {
    try {
        const theNotification = await Notification.create(req.body);
        res.status(200).json(theNotification);
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
});

exports.markAsRead = asyncHandler(async (req, res, next) => {
    const { notificationId } = req.params;
    try {
        const theNotification = await Notification.findOne({ _id: notificationId });
        theNotification.isRead = true;
        await theNotification.save();
        res.status(200).json(theNotification);
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
});

exports.getAll = asyncHandler(async (req, res, next) => {
    try {
        const {type, recipientId} = req.body;
        
        if(type !== "message"){
            const AllNotifications = await Notification.find();
            if (AllNotifications.length === 0) res.status(404).json({ message: "There is no notification" });
            res.status(200).json(AllNotifications);
        } else {
            const notifications = await Notification.find({ recipientId: recipientId });
            if (notifications.length === 0) res.status(404).json({ message: "There is no notification" });
            res.status(200).json(notifications);
        }
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
});

exports.getUnread = asyncHandler(async (req, res, next) => {
    try {
        const {type, recipientId} = req.body;
        if(type !== "message"){
            const AllUnread = await Notification.find({ isRead: false });
            if (AllUnread.length === 0) res.status(404).json({ message: "There is no unread notification" });

            res.status(200).json(AllNotifications);
        } else {
            const unread = await Notification.find({ recipientId: recipientId, isRead: false });
            if (unread.length === 0) res.status(404).json({ message: "There is no unread notification" });
            res.status(200).json(unread);
        }
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
});
