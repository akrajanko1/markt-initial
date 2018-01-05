"use strict";
//works
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const async = require('async');
const restService = express();
const JSON = require('circular-json');
var db = mongoose.connect('mongodb://akr:akr@ds239127.mlab.com:39127/markt');
var User = require('./models/userModel');
var Schema = mongoose.Schema;
/*var modelName="categories";
var defaultModel = new Schema({})
var User1 = db.model(modelName,defaultModel);*/
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
restService.get("/mlab", async function(req,res){
  var speech ="Seems like some problem. Speak again.";
  var tmp=await clothes();
  var flag=0;
  if(tmp!="")
  {
    flag=1;
  }
  //var sval = JSON.stringify(tmp[0]);
  var val={
    "speech": speech+flag,
    "displayText": speech,
    "source": "webhook-echo-sample"
  }
  const string='{'+tmp+'}';
  //val.speech=speech+" haha";
  //val.speech = val;
  /*if(sval!=""){
  val.data=sval;}
  else{
    val.data="nothing";
  }*/
  const richResponsesV1 = {
  'slack': {
    'text': tmp,
    'attachments': [
      {
        'title': 'Title: this is a title',
        'title_link': 'https://assistant.google.com/',
        'text': 'This is an attachment.  Text in attachments can include \'quotes\' and most other unicode characters including emoji 📱.  Attachments also upport line\nbreaks.',
        'image_url': 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
        'fallback': 'This is a fallback.'
      }
    ]
  }
};
  
  const temp={"data":richResponsesV1}
  val.data=temp;
  //val.data=sval;
  return res.json(tmp);
});
//mlab ends///////////////////////


restService.post("/temp", async function(req, res) {
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
else if(req.body.result.parameters.echoText=="categories"){
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  var tmp=await category();
  var val={
    "speech": speech+"works1",
    "displayText": speech,
    "source": "webhook-echo-sample"
  }
  val.data={"data1":tmp};
  //val.data=sval;
  return res.json(val);
}
else{
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  var tmp=await clothes();
  var flag=0;
  if(tmp!="")
  {
    flag=1;
  }
  //var sval = JSON.stringify(tmp[0]);
  var val={
    "speech": speech+flag,
    "displayText": speech,
    "source": "webhook-echo-sample"
  }
  const string='{'+tmp+'}';
  //val.speech=speech+" haha";
  //val.speech = val;
  /*if(sval!=""){
  val.data=sval;}
  else{
    val.data="nothing";
  }*/
  const richResponsesV1 = {
  'slack': {
    'text': tmp,
    'attachments': [
      {
        'title': 'Title: this is a title',
        'title_link': 'https://assistant.google.com/',
        'text': 'This is an attachment.  Text in attachments can include \'quotes\' and most other unicode characters including emoji 📱.  Attachments also upport line\nbreaks.',
        'image_url': 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
        'fallback': 'This is a fallback.'
      }
    ]
  }
};
  
  const temp={"data1":tmp,"data2":tmp}
  val.data=temp;
  //val.data=sval;
  return res.json(val);
}
});

async function clothes(){
  return new Promise(function(resolve,reject){User.find(function(err,users){
    if(err){
        res.status(500).send(err);
    }
    else{
        //res.send(req);
        resolve(users);
    }
})
        /*return ({
          speech: "error1",
          displayText: "error1",
          source: "webhook-echo-sample"
        });*/
})}
async function category(){
  return new Promise(function(resolve,reject){User.find(function(err,users){
    if(err){
        res.status(500).send(err);
    }
    else{
        //res.send(req);
        resolve(users);
    }
})
        /*return ({
          speech: "error1",
          displayText: "error1",
          source: "webhook-echo-sample"
        });*/
})}
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
