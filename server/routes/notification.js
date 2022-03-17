const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { createNotification, markAsRead, getAll, getUnread } = require("../controllers/notification");

router.route("/").post(protect, createNotification);

router.route("/:notificationId").put(protect, markAsRead);

router.route("/").get(protect, getAll);

router.route("/unread").get(protect, getUnread);

module.exports = router;
