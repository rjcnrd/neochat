const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  text: {
    type: String,
    required: [true, "Content is required"]
  },

  // isRead: { type: Boolean },

  _creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  // _conversation: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Conversation"
  // },
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

module.exports = mongoose.model("Message", messageSchema);
