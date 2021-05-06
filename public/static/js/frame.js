class Canvas {
    constructor(el, runTime = () => {}) {
        this.canvas = el;
        this.ctx = this.canvas.getContext('2d');
        this.fps = document.getElementById('fps');
        this.ctx.imageSmoothingEnabled = false;
        this.display = [];
        this.backgroundOpactity = 0;
        this.mapWidth = 100;
        this.mapHeight = 100;
        this.map = [];
        this.usernames = [];
        this.runTime = runTime;
        this.prev;
        window.requestAnimationFrame(this.main.bind(this));
    };

    drawMapPoint({x, y, self}) {
        this.ctx.fillStyle = self ? '#ff0000' : '#ffffff';
        this.ctx.fillRect(innerWidth - 20 - this.mapWidth + (x / 100), 20 + (y / 100), 3, 3);
    };

    main(time) {
        window.requestAnimationFrame(this.main.bind(this));
        if (!this.prev) this.prev = time;
        const delta = time - this.prev;
        this.prev = time;
        this.fps.innerHTML = Math.round(1000/delta);
        this.runTime(delta);

        this.ctx.fillStyle = '#00000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.display.forEach((part) => {
            if (part.cancel) return;
            try {
                switch (part.type) {
                    case 'image':
                        this.ctx.drawImage(part.img, part.x - part.img.width / 2, part.y - part.img.height / 2);
                    break;
                };
            }
            catch (err) {

            };
        });

        if (this.map.length != 0) {
            if (this.backgroundOpactity > 0.3) this.backgroundOpactity = 0.3;
            if (this.backgroundOpactity < 0.3) this.backgroundOpactity += (0.3 / 500) * delta;
            this.ctx.fillStyle = `rgba(0, 0, 0, ${this.backgroundOpactity})`;
            this.ctx.fillRect(innerWidth - 20 - this.mapWidth + 1, 20, this.mapWidth + 1, this.mapHeight + 1);

            this.map.forEach((part) => {
                this.drawMapPoint(part);
            });
        };
        this.ctx.font = 'Questrial 20px';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#000000';
        this.usernames.forEach((part) => {
            this.ctx.fillText(part.username, part.x, part.y);
        });
    };
};

class BackgroundCanvas {
    constructor(el, img) {
        this.canvas = el;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.img = new Image();
        this.img.src = img;
    };

    drawBack(pos) {
        if (this.img.width == 0 && this.img.height == 0) return;
        let width = Math.floor(innerWidth / this.img.width) + 2;
        let height = Math.floor(innerHeight / this.img.height) + 2;
        let offsetX = pos.x % this.img.width;
        let offsetY = pos.y % this.img.height;

        if (pos.x < innerWidth/2 || pos.x > (10000 - innerWidth/2)) offsetX = 0;
        if (pos.y < innerHeight/2 || pos.y > (10000 - innerHeight/2)) offsetY = 0;

        this.ctx.fillStyle = '#808080';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (let col = 0; col <= width; col++) {
            for (let row = 0; row <= height; row++) {
                this.ctx.drawImage(this.img, ((col - 1) * this.img.width) - offsetX, ((row - 1) * this.img.height) - offsetY);
            };
        };
    };
};