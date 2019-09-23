var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
  id:1,
  text: "hola soy un mensaje",
  author: "mensaje chan"
}]
app.use(express.static('views'));


app.get("/", function(req,res){
  res.status(200).send("hello world");
});

io.on("connection",function(socket){
  console.log("Alguien se ha conectado con sockets");
  socket.emit('messages', messages);

  socket.on('new-message',function(data){
    messages.push(data);

    io.sockets.emit('messages',messages);
  });
});

server.listen(3000,function(){
  console.log("servidor funcionando en puerto 3000");
});
