const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

var histo = ["Bonjour","Bienvenue !","Voici le tchat du 2048","Veuillez suivre les règles de bonne utilisation du tchat:","- pas d'insultes","- pas de spam","- pas de pub","   ","Merci de votre compréhension.","   ","le staff."];

io.on('connection', socket => {
    socket.emit('historique', histo);
    socket.on('chat message', msg => {
        console.log("Mesage entrant de " + msg.author + " : " + msg.text);
        io.emit('chat message', msg);
        histo.push(msg);
        histo.shift();
    });
});

http.listen(3000);