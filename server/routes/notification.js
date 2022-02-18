const express = require("express");
const router = express.Router();
const { createNotification, markAsRead, getAll, getUnread } = require("../controllers/notification");

router.route("/").post(createNotification);

router.route("/:notificationId").put(markAsRead);

router.route("/").get(getAll);

router.route("/unread").get(getUnread);

module.exports = router;
