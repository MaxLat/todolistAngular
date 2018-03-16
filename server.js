var express = require('express')
var bodyParser = require('body-parser')
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test3');
const Todo = require("./modele/todo_modele");

var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use('/assets' , express.static('client/static'))
app.use('/app' , express.static('client/app'))

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/client/index.html'));
})


app.get('/liste', function (req, res) {
    Todo.find({}, function(err , docs){
        if(err)
        {
            console.log(err);
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
})



app.put('/liste/:id', function (req, res) {

    Todo.update({ "_id": req.params.id }, req.body, function (err, todo) {
      if(err){
        res.send(err);
      }
    }).then(function(todo) {
        io.emit('editTodo', { id: req.params.id, todo: req.body });
        res.status(200);
        res.send(req.body);
    });
});



/* On supprime un utilisateur de la liste */
//app.delete('/liste/:id', function (req, res) {
//
//  Todo.remove({ id: req.params.id }, function(err, todo) {
//
//    if(err){
//      res.send(err);
//	  console.log("erreur"+err);
//    }
//
//  }).then(function(todo) {
//       res.send(todo);
//	   console.log("dele todo todo"+req.params.id);
//       io.emit('deleteTodo', req.params.id);
//
//  });
//});
app.delete('/liste/:i', function(req, res){
	console.log('quelqu\'un veut supprimer une entrée l\'annuaire');
	console.log(req.params.i);
		Todo.findByIdAndRemove(req.params.i,function(err,docs){
			if(err){
				console.log(err);
				return res.sendStatus(500);
			}else{
				//io.emit('modif', 'l\'annuaire a subit des modifications');
				io.emit('deleteTodo', req.params.i);

				return res.sendStatus(200);
			}
		});         


});



app.post('/liste/', function(req, res){

        var toDo = new Todo(req.body);
        toDo.save(function(error, success) {
			if(error){console.log(error);}else{
		 //io.emit('ajoutTodo', {toDo });
		 io.emit('ajoutTodo', {success });
		}
	});

    return res.send("OK");
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('message' , 'bien connecté');
});
