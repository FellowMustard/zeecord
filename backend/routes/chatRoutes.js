const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { createGroupChat, fetchChat } = require("../controllers/chatController");

router.route("/").get(verifyToken, fetchChat);
router.route("/group").post(verifyToken, createGroupChat);

module.exports = router;
