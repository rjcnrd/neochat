const mongoose = require("mongoose");
const { Schema } = mongoose;

const emojiSchema = new Schema({
 no: Number,
 codes: String,
 char: String,
 name: String,
 keywords: String

});

module.exports = mongoose.model("Emoji", emojiSchema);
