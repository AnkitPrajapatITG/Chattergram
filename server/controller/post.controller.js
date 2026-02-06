const {
  signUpservice,
  createService,
  Likeservice,
  Commentservice,
  Viewservice,
  getAllPostService,
  getAllUserPostService,
  replyservice,
  deletePostService,
} = require("../services/post.service.js");
const { sendResponse } = require("../utils/sendResponse");
const { statusCode } = require("../constant/statusCodes.js");
const { SuccessMessage } = require("../constant/messages");
var jwt = require("jsonwebtoken");
const { uploadImageToCloudinary } = require("../utils/fileUpload.js");
exports.createPost = async (req, res) => {
  try {
    const { title, content, hashTag, token } = req.body;
    const media = req.files;

    console.log(media);

    const fileUrls = await Promise.all(
      media.map(async (file) => {
        return (await uploadImageToCloudinary(file, "chattergram")).secure_url;
      }),
    );

    console.log(fileUrls);

    const userToken = jwt.verify(token, process.env.JWT_SECRET);

    const data = await createService(
      {
        title,
        content,
        hashTag,
        media: fileUrls,
      },
      req,
      res,
    );
    return sendResponse(
      res,
      statusCode.OK,
      true,
      SuccessMessage.DATA_CREATED,
      data,
    );
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      statusCode.INTERNAL_SERVER_ERROR,
      false,
      error.message,
    );
  }
};

exports.deletePost = async (req, res) => {
  try {
    const {postId} = req.params;

    const data = await deletePostService(postId, req, res);
    return sendResponse(res, statusCode.OK, true, SuccessMessage.DELETED, data);
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      statusCode.INTERNAL_SERVER_ERROR,
      false,
      error.message,
    );
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const data = await getAllPostService();
    return sendResponse(
      res,
      statusCode.OK,
      true,
      SuccessMessage.DATA_FETCHED,
      data,
    );
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      statusCode.INTERNAL_SERVER_ERROR,
      false,
      error.message,
    );
  }
};

exports.getAllUserPost = async (req, res) => {
  try {
    const { userName } = req.params;
    const data = await getAllUserPostService(userName);

    return sendResponse(
      res,
      statusCode.OK,
      true,
      SuccessMessage.DATA_FETCHED,
      data,
    );
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      statusCode.INTERNAL_SERVER_ERROR,
      false,
      error.message,
    );
  }
};

exports.likePost = async (req, res) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      return sendResponse(
        res,
        statusCode.BAD_REQUEST,
        false,
        "All fields are required",
      );
    }

    const data = await Likeservice({ postId }, req, res);
    return sendResponse(
      res,
      statusCode.OK,
      true,
      SuccessMessage.DATA_CREATED,
      data,
    );
  } catch (error) {
    console.log(error.message);
    return sendResponse(
      res,
      statusCode.INTERNAL_SERVER_ERROR,
      false,
      error.message,
    );
  }
};

exports.viewPost = async (req, res) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      return sendResponse(
        res,
        statusCode.BAD_REQUEST,
        false,
        "All fields are required",
      );
    }

    const data = await Viewservice({ postId }, req, res);
    return sendResponse(
      res,
      statusCode.OK,
      true,
      SuccessMessage.DATA_CREATED,
      data,
    );
  } catch (error) {
    console.log(error.message);
    return sendResponse(
      res,
      statusCode.INTERNAL_SERVER_ERROR,
      false,
      error.message,
    );
  }
};

exports.commentPost = async (req, res) => {
  try {
    const { postId, content } = req.body;

    if (!postId || !content) {
      return sendResponse(
        res,
        statusCode.BAD_REQUEST,
        false,
        "All fields are required",
      );
    }

    const data = await Commentservice({ postId, content }, req, res);
    return sendResponse(
      res,
      statusCode.OK,
      true,
      SuccessMessage.DATA_CREATED,
      data,
    );
  } catch (error) {
    console.log(error.message);
    return sendResponse(
      res,
      statusCode.INTERNAL_SERVER_ERROR,
      false,
      error.message,
    );
  }
};

exports.replyToCommentPost = async (req, res) => {
  try {
    const { commentId, content } = req.body;

    if (!commentId || !content) {
      return sendResponse(
        res,
        statusCode.BAD_REQUEST,
        false,
        "All fields are required",
      );
    }

    const data = await replyservice({ commentId, content }, req, res);
    return sendResponse(
      res,
      statusCode.OK,
      true,
      SuccessMessage.DATA_CREATED,
      data,
    );
  } catch (error) {
    console.log(error.message);
    return sendResponse(
      res,
      statusCode.INTERNAL_SERVER_ERROR,
      false,
      error.message,
    );
  }
};
