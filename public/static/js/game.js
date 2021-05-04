class Game {
    constructor(canvas, id, backgroundCanvas,  x, y) {
        this.canvas = new Canvas(canvas);
        this.coords = {
            x: x,
            y: y
        };
        this.background = backgroundCanvas;
        this.id = id;
        this.players = {
            background: {
                player: {
                    x: 5000,
                    y: 5000,
                    mouseAngle: 0
                }
            }
        };
        this.speed = 2;

        this.canvas.runTime = (delta) => {
            if (!this.id) return this.id = socket.id;

            let areaView = {};
            if (this.players[this.id]) {
                if (this.players[this.id].player.x < innerWidth/2) areaView.x = 0;
                else if (this.players[this.id].player.x > (10000 - innerWidth/2)) areaView.x = 10000 - innerWidth;
                else areaView.x = this.players[this.id].player.x - innerWidth/2;
                if (this.players[this.id].player.y < innerHeight/2) areaView.x = 0;
                else if (this.players[this.id].player.y > (10000 - innerHeight/2)) areaView.y = 10000 - innerHeight;
                else areaView.y = this.players[this.id].player.y - innerHeight/2;
            };

            this.canvas.map = [];
            this.canvas.usernames = [];
            Object.keys(this.players).forEach((id) => {
                let player = this.players[id];
                if (Object.keys(this.players).length != 1 && id == 'background') return;
                if (id != 'background') this.canvas.map.push({x: player.player.x, y: player.player.y});
                player.player.x += (-Math.cos(player.player.mouseAngle * (Math.PI / 180))) * this.speed * delta / 10;
                player.player.y += (-Math.sin(player.player.mouseAngle * (Math.PI / 180))) * this.speed * delta / 10;
                if (player.player.y < 0) player.player.y = 0;
                else if (player.player.y > 10000) player.player.y = 10000; 
                if (player.player.x < 0) player.player.x = 0;
                else if (player.player.x > 10000) player.player.x = 10000; 
                
                if (id == this.id || id == 'background') this.background.drawBack(player.player);
                if (id == this.id) this.canvas.map[this.canvas.map.length - 1].self = true;

                if (id == this.id) {
                    this.coords.x.innerHTML = Math.round(player.player.x);
                    this.coords.y.innerHTML = Math.round(player.player.y);
                    let pos = {};
                    if (player.player.x < innerWidth/2) pos.x = player.player.x;
                    else if (player.player.x > (10000 - innerWidth/2)) pos.x = innerWidth - (10000 - player.player.x);
                    else pos.x = innerWidth/2;
                    if (player.player.y < innerHeight/2) pos.y = player.player.y;
                    else if (player.player.y > (10000 - innerHeight/2)) pos.y = innerHeight - (10000 - player.player.y);
                    else pos.y = innerHeight/2;

                    this.canvas.display[player.index].x = pos.x;
                    this.canvas.display[player.index].y = pos.y;

                    this.canvas.usernames.push({
                        x: pos.x,
                        y: pos.y - 30,
                        username: player.player.username
                    });
                }
                else if (player.index != undefined) {
                    if (areaView.x <= player.player.x && areaView.x + innerWidth >= player.player.x && areaView.y <= player.player.y && areaView.y + innerHeight >= player.player.y) {
                        this.canvas.display[player.index].x = player.player.x % innerWidth;
                        this.canvas.display[player.index].y = player.player.y % innerHeight;
                        this.canvas.display[player.index].cancel = false;

                        this.canvas.usernames.push({
                            x: player.player.x % innerWidth,
                            y: (player.player.y % innerHeight) - 30,
                            username: player.player.username
                        });
                    }
                    else {
                        this.canvas.display[player.index].cancel = true;
                    };

                };
            });
        };
        window.addEventListener('mousemove', (ev) => {
            let x = [this.canvas.display[this.players[this.id]?.index]?.x || innerWidth / 2, ev.x];
            let y = [this.canvas.display[this.players[this.id]?.index]?.y || innerHeight / 2, ev.y];

            x = x[0] - x[1];
            y = y[0] - y[1];

            let theata = Math.atan(Math.abs(y / x)) * (180 / Math.PI);
            
            if (x >= 0 && y <= 0) theata = 360 - theata;
            else if (x <= 0 && y >= 0) theata = 180 - theata;
            else if (x <= 0 && y <= 0) theata = 180 + theata;

            this.players.background.player.mouseAngle = theata;
            if (this.players[this.id]) {
                this.players[this.id].player.mouseAngle = theata;
            };
        });
        window.addEventListener('touchmove', (ev) => {
            let x = [this.canvas.display[this.players[this.id]?.index]?.x || innerWidth / 2, ev.changedTouches[0].clientX];
            let y = [this.canvas.display[this.players[this.id]?.index]?.y || innerHeight / 2, ev.changedTouches[0].clientY];

            x = x[0] - x[1];
            y = y[0] - y[1];

            let theata = Math.atan(Math.abs(y / x)) * (180 / Math.PI);
            
            if (x >= 0 && y <= 0) theata = 360 - theata;
            else if (x <= 0 && y >= 0) theata = 180 - theata;
            else if (x <= 0 && y <= 0) theata = 180 + theata;

            this.players.background.player.mouseAngle = theata;
            if (this.players[this.id]) {
                this.players[this.id].player.mouseAngle = theata;
            };
        });
    };
    addPlayer(id, player) {
        this.players[id] = {
            player: player,
            index: this.canvas.display.length
        };
        this.canvas.display[this.canvas.display.length] = {
            type: 'image',
            x: 0,
            y: 0,
            img: createImage('/static/img/gameAssets/player.png')
        };
    };
};