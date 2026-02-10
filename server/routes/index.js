const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const authRoutes = require("../routes/authRoutes");
const postRoutes = require("../routes/postRoutes");
const { addFollower, removeFollower } = require("../controller/social.controller");
const { verify } = require("../middlewares/verifyUser");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/post",  postRoutes);
router.post("/social/addFollower",verify, addFollower);
router.post("/social/removeFollower",verify,removeFollower);

module.exports = router;
