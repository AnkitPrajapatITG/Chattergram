// const UserModel = require("../server/models/User.model");
const UserModel = require('../models/User.model.js');
const { ErrorMessage } = require('../constant/messages.js')

exports.signUpservice = async ({ name, dob, userName, email }, res) => {
    const user = await UserModel.findOne(userName);
    if (user) {
        throw new Error(ErrorMessage.USER_ALREADY_EXIST);

    }

    const newUser = UserModel.create({ name, dob, userName, email });
    return newUser;



}