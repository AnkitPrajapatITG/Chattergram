const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const authRoutes = require("../routes/authRoutes");
const postRoutes = require("../routes/postRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/post",  postRoutes);

module.exports = router;
