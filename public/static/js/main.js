(() => {
    let game;
    const $ = (id) => document.querySelector(id);
    const canvas = $('#mainCanvas');
    const backgroundCanvas = $('#backgroundCanvas');
    window.addEventListener('DOMContentLoaded', () => {
        document.body.style.opacity = 1;
        let background = new BackgroundCanvas(canvas, '/static/img/background.jpg');
        game = new Game(canvas, socket.id, background);
    });
    
        

    canvas.width = innerWidth;
    canvas.height = innerHeight;
    backgroundCanvas.width = innerWidth;
    backgroundCanvas.height = innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        backgroundCanvas.width = innerWidth;
        backgroundCanvas.height = innerHeight;
    });

    socket.on('addPlayer', (id, player) => {
        game.addPlayer(id, player)
    });

    const form = $('form');
    const loginScreen = $('#login');
    const cover = $('#cover');
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        let username = form.children[0].value;
        loginScreen.style.top = '-50%';
        cover.style.opacity = '0';

        form.children[0].value = '';

        socket.emit('joinGame', username);

        let img = new Image();
        img.src = '/static/img/gameAssets/player.png';
        game.canvas.display.push({
            type: 'image',
            x: innerWidth / 2 - 25,
            y: innerHeight / 2,
            img: img
        });
    });
})();