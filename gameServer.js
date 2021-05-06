class Game {
    constructor(io) {
        this.players = {};
        this.io = io;
    };

    addPlayer(id, username, socket) {
        socket.on('disconnect', () => {
            if (!(socket.id in this.players)) return;
            this.players[socket.id].disconnect();
        });
        socket.on('changeAngle', (angle, x, y) => {
            if (!(socket.id in this.players)) return;
            this.players[socket.id].player.mouseAngle = angle;
            this.players[socket.id].player.x = x;
            this.players[socket.id].player.y = y;

            socket.broadcast.emit('playerMove', socket.id, angle, x, y);
        });

        socket.emit('initGame', this.getJSON());
        this.players[id] = new Player(id, username, socket, () => {delete this.players[id]; this.io.emit('disconnnect', id)});
        this.io.emit('addPlayer', id, this.players[id].player);
    };

    getJSON() {
        let game = {};
        Object.keys(this.players).forEach((id) => {
            game[id] = this.players[id].player;
        });
        return game;
    };
};

class Player {
    constructor(id, username, socket, onDis) {
        this.socket = socket;
        this.id = id;
        this.player = {
            x: Math.round(Math.random() * 10000),
            y: Math.round(Math.random() * 10000),
            mouseAngle: null,
            username: username
        };
        this.onDis = onDis;
    };
    disconnect() {
        this.onDis();
    };
};

module.exports.Player = Player;
module.exports.Game = Game;