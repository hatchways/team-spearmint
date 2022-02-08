const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { createRequest, getRequests, getSitterRequests, getOwnerRequests, updateRequest } = require("../controllers/request");

router.route("/").post(protect, createRequest);
router.route("/").get(protect, getRequests);
router.route("/sitter/:id").get(protect, getSitterRequests);
router.route("/owner").get(protect, getOwnerRequests);
router.route("/sitter").put(protect, updateRequest);

module.exports = router;
