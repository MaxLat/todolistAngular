var express = require('express')
var bodyParser = require('body-parser')
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test3');
const Todo = require("./modele/todo_modele");
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var urlencodedParser = bodyParser.urlencoded({ extended: false });
// test 


var app = express()
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use('/assets' , express.static('client/static'))
app.use('/app' , express.static('client/app'))

app.get('/', function (req, res) {


   /*var myobj = { Nom: "Company Inc", Description: "Highway 37" , Date : "12/04/2057"  , Etat : true};
   var entre = new Todo(myobj);
   entre.save();*/
   res.sendFile(path.join(__dirname + '/client/index.html'));

})


app.get('/liste', function (req, res) {
    console.log(__dirname);
    var test

    Todo.find({}, function(err , docs){
        //console.log(docs);
        //test = docs;
        if(err)
        {
            console.log(err)
            return res.sendStatus(500);
        }
        else
        {
            return res.json(docs);

        }
    })


})


app.get('/liste/:id', function (req, res) {
    console.log(__dirname);

     Todo.findOne({'_id' : req.params.id}, function(err , docs){
        //console.log(docs);
        //test = docs;
        if(err)
        {
            console.log(err)
            return res.sendStatus(500);
        }
        else
        {
           return res.json(docs);

        }
    }).select('-__v')



    //res.json(test[req.params.id]);
})



app.put('/liste/:id', function (req, res) {

  console.log(req.body);

    Todo.update({ "_id": req.params.id }, req.body, function (err, eleve) {

      if(err){
        res.send(err);
      }

    }).then(function(eleve) {
        //io.emit('editUser', { id: req.params.id, user: req.body });
        res.status(200);
        res.send(req.body);
    });
});



/* On supprime un utilisateur de la liste */
app.delete('/liste/:id', function (req, res) {

  Todo.remove({ _id: req.params.id }, function(err, eleve) {

    if(err){
      res.send(err);
    }

  }).then(function(eleve) {
       res.send(eleve);
       //io.emit('removeList', req.params.id);

  });
});


app.post('/liste/', function(req, res){

        var kitty = new Todo(req.body);
        kitty.save().then(function(req, res) {
    });
    return res.send("OK");
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('message' , 'bien connecté');
});

app.listen(3000)
