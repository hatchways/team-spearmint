const Notification = require("../models/Notification");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.createNotification = asyncHandler(async (req, res, next) => {
    const {type, title, message, isRead, reatAt, recipientId} = req.body;
    const theNotification = await Notification.create(type, title, message, isRead, reatAt, recipientId);
    res.status(200).json(theNotification);
});

exports.markAsRead = asyncHandler(async (req, res, next) => {
    const { notificationId } = req.params;
    const { userId } =req.body

    const theNotification = await Notification.findOne({ _id: notificationId });
   
    if(theNotification.recipientId === userId) {
        theNotification.isRead = true;
        await theNotification.save();
        res.status(200).json(theNotification);
    } else {
        res.status(404).json({ message: "The notification doesn't belong to this user" });
    }
});

exports.getAll = asyncHandler(async (req, res, next) => {
    const {recipientId} = req.user.id;

        const AllNotifications = await Notification.find();
        res.status(200).json(AllNotifications);
});

exports.getUnread = asyncHandler(async (req, res, next) => {
    const {type, recipientId} = req.body;

        const AllUnread = await Notification.find({ isRead: false });
        res.status(200).json(AllUnread);

});
