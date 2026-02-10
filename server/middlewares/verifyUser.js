const { sendResponse } = require("../utils/sendResponse");
const { statusCode } = require("../constant/statusCodes.js");
const { ErrorMessage } = require("../constant/messages");

const jwt = require("jsonwebtoken");

exports.verify = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // e.g. "Bearer eyJhbGciOiJIUzI1NiIs..."
    if (!authHeader)
      return res.status(401).json({ message: "Missing Authorization header" });

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token)
      return res.status(401).json({ message: "Invalid Authorization format" });

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
