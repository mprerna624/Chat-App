// Server Side Logic

const express = require('express');
const app = express();
const path = require('path'); //For static files
const http = require('http'); //No need to install already present in NodeJs
const server = http.createServer(app); //web socket server or communication server
const socketio = require('socket.io');
const io = socketio(server); //io => web socket server object


const users = {} //list of users with their respective usernames and socket ids

//For static files
app.use('/', express.static(path.join(__dirname, '/public')));

//connection is a pre-defined event just like click event on btn
io.on('connection', (socket) => {
    console.log(`Connection established at ${socket.id}`);

    socket.on('send-msg', (data) => { //listen to some event
        // console.log(data.msg);
        // socket.emit('received-msg', { //For a single socket
        io.emit('received-msg', {  //For all the sockets
            msg: data.msg,
            id: socket.id,
            username: users[socket.id]
        })
    })


    socket.on('login', (data) => {
        users[socket.id] = data.username; //mapping the socket id with the username
    })
})


const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server Connected at port ${port}!!`)
})