const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
const PORT = process.env.PORT || 5001;

// Set up Socket.IO
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('play', (track) => {
        console.log(Playing track: ${track});
        // Broadcast play event to all clients
        socket.broadcast.emit('trackChanged', track);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(Server listening on port ${PORT});
});

