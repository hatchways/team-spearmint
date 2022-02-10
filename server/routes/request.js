const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { createRequest, getRequests, updateRequest } = require("../controllers/request");

router.route("/").post(protect, createRequest);
router.route("/").get(protect, getRequests);
router.route("/").put(protect, updateRequest);

module.exports = router;
