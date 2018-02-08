const app = require('express')();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const uuidv1 = require('uuid/v1');
const _ = require('lodash');

const io = require('socket.io')(server, {
    path: '/chat',
    serveClient: false,
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});

const rooms = [{ id: uuidv1(), name: 'general' }, {id: uuidv1(), name: 'specific'}];

app.use(bodyParser.json());

app.get('/api/rooms', (req, res) => {
    res.send(rooms);
});

app.post('/api/rooms', (req, res) => {

    let room = req.body;

    if (_.some(rooms, r => r.name === room.name)){
        return res.status(400).send();
    }

    room.id = uuidv1();
    rooms.push(room);

    return res.status(201).send(room);

});

server.listen(3001);

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log("received data", data);
    });
});
