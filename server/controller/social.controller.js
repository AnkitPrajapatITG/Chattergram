const { signUpservice, Loginservice } = require("../services/auth.service");
const { sendResponse } = require("../utils/sendResponse");
const { statusCode } = require("../constant/statusCodes.js");
const { SuccessMessage } = require("../constant/messages");
const { addFollowerService, removeFollowerService } = require("../services/social.service.js");

exports.addFollower = async (req, res) => {
  try {
    const { userName } = req.body;
    const data = await addFollowerService({ userName },req,res);
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

exports.removeFollower = async (req, res) => {
  try {
    const { userName } = req.body;
    const data = await removeFollowerService({ userName },req,res);
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