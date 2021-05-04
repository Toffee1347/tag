(() => {
    let game;
    const $ = (id) => document.querySelector(id);
    const canvas = $('#mainCanvas');
    window.addEventListener('DOMContentLoaded', () => {
        document.body.style.opacity = 1;
        let background = new BackgroundCanvas(canvas, '/static/img/background.jpg');
        game = new Game(canvas, socket.id, background, $('#X'), $('#Y'));
    });
    
        

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    });

    socket.on('addPlayer', (id, player) => {
        game.addPlayer(id, player)
    });

    const form = $('form');
    const loginScreen = $('#login');
    const cover = $('#cover');
    const coords = $('#coords');
    form.addEventListener('submit', (ev) => {
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