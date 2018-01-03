var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
    name: {
        type: String
    },
    age: {type:Number},
    email: {type: String}
})

module.exports = mongoose.model('names',userModel);