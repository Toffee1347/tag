(() => {
    let game;
    let titleScreen = true;
    const $ = (id) => document.querySelector(id);
    const canvas = $('#mainCanvas');
    window.addEventListener('DOMContentLoaded', () => {
        document.body.style.opacity = 1;
        let background = new BackgroundCanvas(canvas, '/static/img/background.jpg');
        game = new Game(canvas, socket.id, background, $('#X'), $('#Y'));
        // $('#playerImg').src = '/static/img/gameAssets/player.png';
    });
    
        

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    });

    socket.on('addPlayer', (id, player) => {
        if (titleScreen) return;
        game.addPlayer(id, player);
    });
    socket.on('initGame', (serverGame) => {
        Object.keys(serverGame).forEach((id) => {
            game.addPlayer(id, serverGame[id]);
        });
    });
    socket.on('disconnnect', (id) => {
        if (!(id in game.players)) return;
        delete game.players[id];
    });
    socket.on('playerMove', (id, angle, x, y) => {
        if (!(id in game.players)) return;
        game.players[id].player.mouseAngle = angle;
        game.players[id].player.x = x;
        game.players[id].player.y = y;
    });

    const form = $('#join');
    const loginScreen = $('#login');
    const cover = $('#cover');
    const coords = $('#coords');
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();

        var field = document.createElement('input');
        field.type = 'text';
        document.body.appendChild(field);
        field.focus();
        field.style.display = 'none';

        document.documentElement.requestFullscreen();
        titleScreen = false;
        game.run = true;
        ev.preventDefault();
        let username = form.children[0].value;
        loginScreen.style.top = '-50%';
        cover.style.opacity = '0';
        coords.style.opacity = '1';

        form.children[0].value = '';

        socket.emit('joinGame', username);
    });
})();

function createImage(src) {
    let img = new Image();
    img.src = src;
    return img;
};

async function changeSize(img, width, height) {

};