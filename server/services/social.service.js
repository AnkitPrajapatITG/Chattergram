const UserModel = require("../models/User.model.js");
const PostModel = require("../models/Post.model.js");
const CommentModel = require("../models/Comment.model.js");
const { ErrorMessage } = require("../constant/messages.js");

exports.addFollowerService = async ({ userName }, req, res) => {
  const user = await UserModel.findOne({ userName: req.user.userName });
  const partener = await UserModel.findOne({ userName });

  if (!user || !partener) {
    throw new Error(ErrorMessage.USER_NOT_FOUND);
  }

  partener.followers.push(user._id);
  user.following.push(partener._id);

  partener.save();
  user.save();

  return { user, partener };
};
exports.removeFollowerService = async ({ userName }, req, res) => {
  const user = await UserModel.findOne({ userName: req.user.userName });
  const partener = await UserModel.findOne({ userName });

  if (!user || !partener) {
    throw new Error(ErrorMessage.USER_NOT_FOUND);
  }

  partener.followers = partener.followers.filter(
    (u) => u._id.toString() != user._id.toString(),
  );
  
  user.following = user.following.filter(
    (u) => u._id.toString() != partener._id.toString(),
  );

  partener.save();
  user.save();

  return { user, partener };
};
