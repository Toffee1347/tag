class Game {
    constructor(io) {
        this.players = {};
        this.io = io;
    };

    addPlayer(id, username, socket) {
        this.players[id] = new Player(id, username, socket);
        this.io.emit('addPlayer', id, this.players[id].player);
    };

    getJSON() {
        let game = {};
        Object.keys(this.players).forEach((id) => {
            game[id].username
        });
    };
};

class Player {
    constructor(id, username, socket) {
        this.socket = socket;
        this.id = id;
        this.player = {
            x: Math.round(Math.random() * 10000),
            y: Math.round(Math.random() * 10000),
            mouseAngle: 0,
            username: username
        };
    };
};

module.exports.Player = Player;
module.exports.Game = Game;