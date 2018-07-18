const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Conversation = require("../models/Conversation")
const passport = require('passport');
const config = require('../configs/index');

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'my-images',
  allowedFormats: ['jpg', 'png', 'gif'],
});

const parser = multer({ storage });

// Route to get all users
router.get('/', (req, res, next) => {
  User.find()
  .populate("_friends")
    .then(users => {
      res.json(users)
    })
});

// Route to get all friends
//filter of all users those ids that match with friend array 
router.get('/friends', passport.authenticate("jwt", config.jwtSession),(req, res, next) => {
  var userId = req.userId
  var friends = req.user._friends;
  User.find({'_id': { $in: friends}})
    .then(friends => {
      res.json(friends)
    })
});


// Route to get 1 user
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
  .populate("_friends")
    .then(user=> {
      res.json(user)
    })
    .catch(err => next(err))
});

/* EDIT User. */
router.patch('/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  let updates = {};
  if (req.body._friends !== ""){updates._friends = req.body._friends };
  if (req.body.name !== ""){updates.name = req.body.name};
  if (req.body.pictureUrl !== ""){updates.pictureUrl = req.body.pictureUrl};


  User.findByIdAndUpdate(req.params.id, updates)
  .then(user => {
    res.json({
      message: 'Conversation updated successfully',user
    });
  }) 
  .catch(error => next(error))     
})

//Add a friend 
router.post('/friends', passport.authenticate("jwt", config.jwtSession),(req, res, next) => {
  let {friendId} = req.body
  User.findByIdAndUpdate(req.user._id , {$push: { _friends: friendId } })
  .then(() => {
    res.json({
      success: true,
    });
  })
  .catch(err => next(err))
})

// ...Object.keys(req.body) 


// Route to add a picture on one user with Cloudinary
// To perform the request throw Postman, you need
// - Endpoint: POST http://localhost:3030/api/first-user/users/pictures
// - Select: Body > form-data
// - Put as key: picture (and select "File")
// - Upload your file
// To perform the request in HTML:
//   <form method="post" enctype="multipart/form-data" action="http://localhost:3030/api/users/first-user/pictures">
//     <input type="file" name="picture" />
//     <input type="submit" value="Upload" />
//   </form>
router.post('/first-user/pictures', parser.single('picture'), (req, res, next) => {
  console.log('DEBUG req.file', req.file);
  User.findOneAndUpdate({}, { pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
});

module.exports = router;