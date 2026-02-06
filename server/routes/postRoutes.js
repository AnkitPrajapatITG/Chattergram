const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { verify } = require("../middlewares/verifyUser");

const { createPost, likePost, commentPost, viewPost, getAllPost, getAllUserPost, replyToCommentPost, deletePost } = require("../controller/post.controller");

const router = express.Router();

router.post("/create",upload.array("media"),verify,createPost);
router.get("/allpost",verify,getAllPost);
router.delete("/delete/:postId",verify,deletePost);
router.get("/allpost/:userName",verify,getAllUserPost);
router.post("/like",verify,likePost);
router.post("/comment",verify,commentPost);
router.post("/reply",verify,replyToCommentPost);
router.post("/view",verify,viewPost);


module.exports = router;
