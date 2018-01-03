"use strict";
//works
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const restService = express();
var db = mongoose.connect('mongodb://akr:akr@ds239127.mlab.com:39127/markt');
var User = require('./models/userModel');
restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.post("/", function(req, res) {
  User.find(function(err,users){
    if(err){
        res.status(500).send(err);
    }
    else{
        //res.send(req);
        res.json(users);
    }
})
});
restService.post("/temp", function(req, res) {
  if(req.body.result.parameters.echoText=="clothes"){
    var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
}
else{
  return res.json(clothes());
}
});

function clothes(){
  var val;
  User.find(function(err,users){
        //res.send(req);
        val=users;
})
        return ({
          val1:val
          speech: "error1",
          displayText: "error1",
          source: "webhook-echo-sample"
        });
}
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
