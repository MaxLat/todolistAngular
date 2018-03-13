var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
       "Nom": String,
       "Description": String,
       "Date": Date,
       "Etat": Boolean,
})

var Todo = mongoose.model("todo",todoSchema);

module.exports= Todo;