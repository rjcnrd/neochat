const mongoose = require("mongoose");
const Emoji = require("../models/Emoji")
const emojis = require("../datasets/emoji.json")

Emoji.deleteMany()
.then(()=>{
  emojis.map(emoji=>{Emoji.create(emoji)})
  
})
.then(()=>{console.log("success, we imported a bunch of emojis");
})

const dbName = "neoChat";
mongoose.connect(`mongodb://localhost/${dbName}`);

