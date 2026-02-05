const { required } = require("joi");
const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
      trim: true,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Chat") || mongoose.model("Chat", ChatSchema);
