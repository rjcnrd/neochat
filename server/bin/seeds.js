require('dotenv').config()

const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const Emoji = require("../models/Emoji")
const emojis = require("../datasets/emoji.json")

require('../configs/database');



Emoji.deleteMany()
.then(()=>{
  emojis.map(emoji=>{Emoji.create(emoji)})
  
})
.then(()=>{console.log("success, we imported a bunch of emojis");
})


delayPromise = function(duration) {
	return function(){
		return new Promise(function(resolve, reject){
			setTimeout(function(){
				resolve();
			}, duration)
		});
	};
};

const users = [
  new User({
    name: "Ulrich",
    email: "ulrich@ih.com",
  }),
  new User({
    name: "Gerda",
    email: "gerda@ih.com"
  }),
  new User({
    name: "outsider",
    email: "outsider@ih.com"
  }),
  new User({
    name: "stranger",
    email: "stranger@ih.com"
  })
];

users[0]._friends = [users[1]._id, users[2]._id, users[3]._id]
users[1]._friends = [users[0]._id]

const passwords = ["ulrich","gerda","outsider","stranger"];
//Stores Objects after Creation
let userIds = [];
let messageIds = [];


Message.deleteMany()
.then(()=> User.deleteMany())
.then(()=> Conversation.deleteMany())
.then(() => {
  Promise.all([
    User.register(users[0],passwords[0]), 
    User.register(users[1],passwords[1]),
    User.register(users[2],passwords[2]),
    User.register(users[3],passwords[3])])
.then(response => {
  console.log("Response", response);
  for (let i = 0; i < response.length; i++) {
    userIds.push(response[i]._id);
  }
})
.then(()=>{
      Message.create({
        text: "Hey Ulrich, was hast du für Pläne für heute Abend?",
        isRead:true,
        _creator: userIds[0]._id,
      })
      .then((message)=> {
        messageIds.push(message);
      console.log("created first message");
  })
  //Here we need to store all messages into an array, so that the conversation can store an array of the messages related to "Him"
})
.then(delayPromise(5000))
.then(()=>{
    Message.create({
      text: "Ich wollte eigentlich Spargel kochen, hast du Lust dazu zukommen?",
      isRead:true,
      _creator: userIds[1]._id,
    })
    .then((message)=> messageIds.push(message._id)) 
    console.log("created second message")
})
.then(delayPromise(5000))
.then(()=>{
    Message.create({
      text: "klar,wieso nicht! Ich könnte zum Beispiel ne Buddel Riesling mitbringen?",
      isRead:true,
      _creator: userIds[0]._id,
    })
    .then((message)=> messageIds.push(message._id)) 
    console.log("created third message")
})
.then(delayPromise(5000))
.then(()=>{
    Message.create({
      text: "Perfekt, bis gleich!",
      isRead: false,
      _creator: userIds[1]._id,
    })
    .then((message)=> messageIds.push(message._id)) 
    console.log("created 4th message, message Objects:",messageIds)
})    
.then(() => {
  Conversation.create({
    title: "Ulrich und Gilbert quatschen",
    _participants: userIds,
    _messages: messageIds
  })
  .then((doc) => console.log("created conversation"))
})
});


