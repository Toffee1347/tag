class Game {
    constructor(io) {
        this.players = {};
        this.io = io;

    };

    addPlayer(id, username) {
        this.players[id] = new Player(id, username);
        this.io.emit('addPlayer', id, {x: Math.random() * 1920, y: 100, width: 10, height: 10});
    };
};

class Player {
    constructor(id, username) {

    };
};

module.exports.Player = Player;
module.exports.Game = Game;