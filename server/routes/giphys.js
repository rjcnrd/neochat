var express = require('express');
const config = require("../configs/index");
var router = express.Router();
var http = require('http');

// Route to get five matching giphys


router.get('/:searchTerm', function (req, res) {
  console.log("giphys.js log",req.params.searchTerm)
  var queryString = req.params.searchTerm;
  var term = encodeURIComponent(queryString);
  var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + 'sQQwDPelRMy64JYKAWGWisEH7oI3MvzO&limit=5'

  http.get(url, function(response) {
    // // SET ENCODING OF RESPONSE TO UTF8
    // response.setEncoding('utf8');

    // var body = '';

    // response.on('data', function(d) {
    //   // CONTINUOUSLY UPDATE STREAM WITH DATA FROM GIPHY
    //   body += d;
    // });

    // response.on('end', function() {
    //   // WHEN DATA IS FULLY RECEIVED PARSE INTO JSON
    //   var parsed = JSON.parse(body);
    //   // RENDER THE HOME TEMPLATE AND PASS THE GIF DATA IN TO THE TEMPLATE
    //   res.json({gifs: parsed.data})
    // });
  })
  .then(gif=> {
    res.json(gif)
  })
  ;
})


module.exports = router;
