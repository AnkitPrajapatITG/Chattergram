// const UserModel = require("../server/models/User.model");
const UserModel = require("../models/User.model.js");
const { ErrorMessage } = require("../constant/messages.js");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.signUpservice = async (
  { name, dob, userName, email, password },
  res,
) => {
  const user = await UserModel.findOne({ userName });
  if (user) {
    throw new Error(ErrorMessage.USER_ALREADY_EXIST);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = UserModel.create({
    name,
    dob,
    userName,
    email,
    password: hashedPassword,
  });
  return newUser;
};
exports.Loginservice = async ({ userName, email, password }, res) => {

  let user = null;
  if (userName) {
    user = await UserModel.findOne({ userName });
  } else {
    user = await UserModel.findOne({ email });
  }

  if (!user) {
    throw new Error(ErrorMessage.USER_NOT_FOUND);
  }

  const isCorrect = await bcrypt.compare(password, user.password);

  if (!isCorrect) {
    throw new Error(ErrorMessage.WRONG_EMAIL_OR_PASSWORD);
  }

  const token = jwt.sign(
    {
      userName:user.userName,
      email:user.email,
      _id:user._id
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" },
  );

  return {token,user};
};
