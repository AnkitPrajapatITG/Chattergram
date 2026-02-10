const UserModel = require("../models/User.model.js");
const PostModel = require("../models/Post.model.js");
const CommentModel = require("../models/Comment.model.js");
const { ErrorMessage } = require("../constant/messages.js");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.createService = async (
  { title, content, hashTag, media },
  req,
  res,
) => {
  const user = await UserModel.findOne({ userName: req.user.userName });
  if (!user) {
    throw new Error(ErrorMessage.USER_NOT_FOUND);
  }

  const newPost = await PostModel.create({
    title,
    content,
    hashTag,
    media,
    user: req.user._id,
  });

  user.posts.push(newPost._id);

  await user.save();

  return newPost;
};

exports.deletePostService = async (postId, req, res) => {

  const user = await UserModel.findOne({ userName: req.user.userName });
  if (!user) {
    throw new Error(ErrorMessage.USER_NOT_FOUND);
  }

  const deletedPost = await PostModel.deleteOne({
    _id: postId,
  });
 
  user.posts = user.posts.filter((post)=>post != postId);
  user.save();

  return deletedPost;
};

exports.getAllPostService = async () => {
const allPost = await PostModel.find({})
  .populate({
    path: "user",
    select: "userName image name email"
  })
  .populate({
    path: "comments",
    populate: {
      path: "user",
      select: "userName image name"
    }
  })
  .populate({
    path: "likes",
    select: "userName image name"
  })
  .populate({
    path: "views",
    select: "userName image name"
  })
  .populate({
    path: "share",
    select: "userName image name"
  })
  .sort({ createdAt: -1 })
  .lean();
  return allPost;
};

exports.getAllUserPostService = async (userName) => {
  const user = await UserModel.findOne({ userName });
  if (!user) {
    throw new Error(ErrorMessage.USER_NOT_FOUND);
  }
  const allUserPost = await PostModel.find({ user: user._id });
  return allUserPost;
};

exports.Likeservice = async ({ postId }, req, res) => {
  let post = await PostModel.findOne({ _id: postId });

  if (!post) {
    throw new Error(ErrorMessage.POST_NOT_FOUND);
  }

  let user = await UserModel.findOne({ userName: req.user.userName });

  if (!user) {
    throw new Error(ErrorMessage.USER_NOT_FOUND);
  }

  const existLike = post.likes.find(
    (like) => like._id.toString() === user._id.toString(),
  );

  if (!existLike) {
    post.likes.push(user._id);
  }

  await post.save();

  return post;
};

exports.Viewservice = async ({ postId }, req, res) => {
  let post = await PostModel.findOne({ _id: postId });

  if (!post) {
    throw new Error(ErrorMessage.POST_NOT_FOUND);
  }

  let user = await UserModel.findOne({ userName: req.user.userName });

  if (!user) {
    throw new Error(ErrorMessage.USER_NOT_FOUND);
  }

  const existView = post.views.find(
    (view) => view._id.toString() === view._id.toString(),
  );

  if (!existView) {
    post.views.push(user._id);
  }

  await post.save();

  return post;
};

exports.Commentservice = async ({ postId, content }, req, res) => {
  let post = await PostModel.findOne({ _id: postId });

  if (!post) {
    throw new Error(ErrorMessage.POST_NOT_FOUND);
  }

  let user = await UserModel.findOne({ userName: req.user.userName });

  if (!user) {
    throw new Error(ErrorMessage.USER_NOT_FOUND);
  }

  const newComment = await CommentModel.create({
    user: user._id,
    content,
    reply: [],
  });
  console.log("newComment", newComment);
  post.comments.push(newComment._id);

  await post.save();

  return post;
};


exports.replyservice = async ({ commentId, content }, req, res) => {
  let user = await UserModel.findOne({ userName: req.user.userName });

  if (!user) {
    throw new Error(ErrorMessage.USER_NOT_FOUND);
  }
  const commentToReply = await CommentModel.findOne({ _id: commentId })
    .populate("reply")
    .exec();

  if (!commentToReply) {
    throw new Error(ErrorMessage.NOT_FOUND);
  }
  const newComment = await CommentModel.create({
    user: user._id,
    content,
    reply: [],
  });

  commentToReply.reply.push(newComment._id);

  await commentToReply.save();

  return commentToReply.populate("reply");
};
