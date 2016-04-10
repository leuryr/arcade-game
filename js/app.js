// Enemies our player must avoid
var Enemy = function(yStart,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug_edit.png';
    this.speed = speed;
    this.x = 0;
    this.y = yStart;
    this.width = 101;
    this.height = 82;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var distance = this.speed * dt;
    if(this.x < 520) {
        this.x += distance;
    } else {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = "images/char-boy_edit.png";
    this.x = 215;
    this.y = 460;
    this.width = 71;
    this.height = 93;
};

Player.prototype.update = function() {
    if(player.y<40) {
        player.x = 215;
        player.y = 460;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    // Using a switch statement here to provide instuctions
    // on how to handle each of the allowed keys. In addition,
    // I've added if statements to restrict the player's movements
    // to the confines of the canvas.
    switch (key) {
        case 'left':
            if(this.x >= 100) {
                this.x = this.x - 100
            } break;
        case 'right':
            if(this.x <= 315) {
                this.x = this.x + 100
            } break;
        case 'up':
            if(this.y >= 65) {
                this.y = this.y - 85
            } break;
        case 'down':
            if(this.y <= 375) {
                this.y = this.y + 85
            } break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
                    fastEnemy = new Enemy(135, 250),
                    slowEnemy = new Enemy(300,80),
                    pacedEnemy = new Enemy(215, 120)
                ];
// Place the player object in a variable called player
var player = new Player();

checkCollisions = function() {
    allEnemies.forEach(function(enemy) {
        // Collision detection logic adapted from MDN.
        // Added a bit of leniency to the detection boxes,
        // to make the collisions more discernible, and to prevent
        // triggering collision when not on the same row as enemy.
        if(enemy.x < player.x + player.width &&
            enemy.x + enemy.width > (player.x + player.width/2)  &&
            enemy.y < player.y + player.height &&
            enemy.y + enemy.height > (player.y + player.height/2)) {
            player.x = 215;
            player.y = 460;
        }
    });
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});