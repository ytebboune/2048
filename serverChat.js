const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

var histo = ["","","","","","","","","",""];

io.on('connection', socket => {
  socket.emit('histo', histo);
  socket.on('chat message', msg => {
      console.log("Mesage entrant : " + msg);
    io.emit('chat message', msg);
    histo.push(msg);
    histo.shift();
  });
});

http.listen(3000);