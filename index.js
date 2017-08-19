var myApp = require('express')();
var http = require('http').Server(myApp);
var io = require('socket.io')(http);

myApp.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
});

io.on('connection',function(socket){
console.log('new connection' + socket.toString());
socket.on('chat message',function(msg){
  console.log('message '+msg);
  io.emit('chat message',msg);
  });
socket.on('disconnect',function(socket){
  console.log(socket+'disconnect');
  io.emit('closed','');
});
});



http.listen(3000,function(){
  console.log('listening on port 3000');
});