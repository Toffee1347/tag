class Game {
    constructor(canvas, id, backgroundCanvas) {
        this.canvas = new Canvas(canvas);
        this.background = backgroundCanvas;
        this.id = id;
        this.players = {
            [id]: {
                player: {
                    x: 5000,
                    y: 5000
                }
            }
        };
        this.vel = {
            x: 0,
            y: 0
        };
        this.speed = 5;

        this.canvas.runTime = () => {
            this.players[this.id].player.x += this.vel.x * this.speed;
            this.players[this.id].player.y += this.vel.y * this.speed;
            if (this.players[this.id].player.y < 0) this.players[this.id].player.y = 0;
            else if (this.players[this.id].player.y > 10000) this.players[this.id].player.y = 10000; 
            if (this.players[this.id].player.x < 0) this.players[this.id].player.x = 0;
            else if (this.players[this.id].player.x > 10000) this.players[this.id].player.x = 10000; 
            this.background.drawBack(this.players[this.id].player);
        };
        window.addEventListener('mousemove', (ev) => {
            let x = [innerWidth / 2, ev.x];
            let y = [innerHeight / 2, ev.y];

            x = x[0] - x[1];
            y = y[0] - y[1];
            
            this.vel.x = -(x / innerWidth);
            this.vel.y = -(y / innerHeight);
        });
        window.addEventListener('touchmove', (ev) => {
            let x = [innerWidth / 2, ev.changedTouches[0].clientX];
            let y = [innerHeight / 2, ev.changedTouches[0].clientY];

            x = x[0] - x[1];
            y = y[0] - y[1];

            
            this.vel.x = -(x / innerWidth);
            this.vel.y = -(y / innerHeight);
        });
    };
    addPlayer(id, player) {
        this.players[id] = {
            player: player,
            index: this.canvas.display.length
        };
        this.canvas.display[this.canvas.display.length] = {
            x: player.x,
            y: player.y,
            width: player.width,
            height: player.height
        };
    };
};