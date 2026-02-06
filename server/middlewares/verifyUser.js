const { sendResponse } = require("../utils/sendResponse");
const { statusCode } = require("../constant/statusCodes.js");
const { ErrorMessage } = require("../constant/messages");

const jwt = require("jsonwebtoken");

exports.verify = async (req, res, next) => {
  try {
    const { token } = req.body;
    const isValid = await jwt.verify(token, process.env.JWT_SECRET);

    if (isValid) {
      req.user = isValid;
      next();
    } else {
      return sendResponse(
        res,
        statusCode.UNAUTHORIZED,
        false,
        ErrorMessage.NOT_AUTHORIZED,
      );
    }
  } catch (error) {
    console.log("getting error while verifying user", error.message);
    return sendResponse(
      res,
      statusCode.UNAUTHORIZED,
      false,
      ErrorMessage.NOT_AUTHORIZED,
    );
  }
};
