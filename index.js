const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');
const {Game, Player} = require('./gameServer');

const game = new Game(io);

io.on('connection', (socket) => {
    socket.on('joinGame', (username) => {
        if (!username) return;
        game.addPlayer(socket.id, username, socket);
    });
});

app.use((req, res, next) => {
    req.get('X-Forwarded-Proto') !== 'https' && req.get('Host') == 'tiggg.herokuapp.com' ? res.redirect(`https://${req.get('Host')}${req.url}`) : next();
});

app.get('/*', (req, res) => {
    let readFile = true;
    let url = req.url.split('?')[0];
    let file;
    let splitUrl = url.split('/');

    /\./.test(url) ? file = `./public${url}` : file = `./public${url}/index.html`;
    readFile ? (fs.existsSync(file) ? res.sendFile(`${__dirname}${file.replace('.', '')}`) : res.status(404).redirect('/?a')) : false;
});

server.listen(process.env.PORT || 80, () => console.log(`Server opened on port ${process.env.PORT || 80}`));