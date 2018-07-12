const mongoose = require("mongoose");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const User = require("../models/User");

const dbName = "lmatfy";
mongoose.connect(`mongodb://localhost/${dbName}`);


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
  {
    name: "Ulrich",
    email: "ulrich@ih.com"
  },
  {
    name: "Gilbert",
    email: "gilbert@ih.com"
  }
];
//Stores Objects after Creation
let userObjects = [];
let conversationObjects = [];

Message.deleteMany().then(()=>
  {
    User.deleteMany().then(() => {
      Conversation.deleteMany().then(() => {
        User.create(users)
          .then(response => {
            console.log("Response", response);
            for (let i = 0; i < response.length; i++) {
              userObjects.push(response[i]);
              console.log("USER OBJECTS", userObjects);
            }
          })
          .then(() => {
            Conversation.create({
              _participants: userObjects,
              title: "Ulrich und Gilbert quatschen"
            })
            .then(conversation => {
              console.log("conversation", conversation);  
              conversationObjects.push(conversation); 
            })
            .then(()=>{
                 Message.create({
                   text: "Hey Ulrich, was hast du für Pläne für heute Abend?",
                   isRead:true,
                   _creator: userObjects[0],
                   _conversation: conversationObjects[0]
                 })
                 console.log("created first message")
              })
            .then(delayPromise(5000))
            .then(()=>{
                Message.create({
                  text: "Ich wollte eigentlich Spargel kochen, hast du Lust dazu zukommen?",
                  isRead:true,
                  _creator: userObjects[1],
                  _conversation: conversationObjects[0]
                })
                console.log("created second message")
                
            })
            .then(delayPromise(5000))
            .then(()=>{
                Message.create({
                  text: "klar,wieso nicht! Ich könnte zum Beispiel ne Buddel Riesling mitbringen?",
                  isRead:true,
                  _creator: userObjects[0],
                  _conversation: conversationObjects[0]
                })
                console.log("created third message")

            })
            .then(delayPromise(5000))
            .then(()=>{
                Message.create({
                  text: "Perfekt, bis gleich!",
                  isRead: false,
                  _creator: userObjects[1],
                  _conversation: conversationObjects[0]
                })
                console.log("created 4th message")

            })    
    
          })
      });
    });

  }
)


