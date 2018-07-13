const mongoose = require("mongoose");
const { Schema } = mongoose;
const styles = require("../enums/styles.json")

const conversationSchema = new Schema({
  _participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },  
  ],

  _messages :
  [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message'
    },  
  ],

  title: String,
  design: { type: String, enum: styles}


});

module.exports = mongoose.model("Conversation", conversationSchema);
