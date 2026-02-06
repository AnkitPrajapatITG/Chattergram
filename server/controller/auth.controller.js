const { signUpservice } = require("../services/auth.service");
const { sendResponse } = require("../utils/sendResponse");
const { statusCode } = require('../constant/statusCodes.js');
const { SuccessMessage } = require("../constant/messages");


exports.signup = async (req, res) => {
    try {

        const { name, dob, userName, email } = req.body;
        const data = await signUpservice(name, dob, userName, email)
        return sendResponse(res, statusCode.OK, true, SuccessMessage.DATA_CREATED, data)


    } catch (error) {
        console.log(error.message);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, error.message)
    }
}
