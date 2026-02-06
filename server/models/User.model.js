const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      // required: true,
      trim: true,
    },
    bio: {
      type: String,
      // required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      default: "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid&w=740&q=80"
    },
    dob: {
      type: Date,
    },
    name: {
      type: String,
      // required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      // required: true,
      trim: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
    // token: {
    //   type: String,
    //   trim: true,
    //   expires: 300,
    // },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", UserSchema);
