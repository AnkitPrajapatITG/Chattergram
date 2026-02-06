const { signUpservice, Loginservice } = require("../services/auth.service");
const { sendResponse } = require("../utils/sendResponse");
const { statusCode } = require("../constant/statusCodes.js");
const { SuccessMessage } = require("../constant/messages");

exports.signup = async (req, res) => {
  try {
    const { name, dob, userName, email, password } = req.body;
    const data = await signUpservice({ name, dob, userName, email, password });
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

exports.login = async (req, res) => {
    try {

        const {  userName, email, password } = req.body;

        if((!userName && !email ) || !password){
            return sendResponse(res, statusCode.BAD_REQUEST, false, "All fields are required")
        }

        const data = await Loginservice({userName, email, password})
        return sendResponse(res, statusCode.OK, true, SuccessMessage.DATA_CREATED, data)

    } catch (error) {
        console.log(error.message);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, error.message)
    }
}
