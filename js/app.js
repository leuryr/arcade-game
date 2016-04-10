// Enemies our player must avoid
var Enemy = function(yStart,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug_edit.png';
    this.x = 0;
    // Each enemy object takes in yStart and speed
    // parameters. yStart indicates the starting y cooridinate,
    // speed indicates the enemy's speed.
    this.y = yStart;
    this.speed = speed;
    // Both enemy and player objects have width and height
    // properties that reflect their sprite's resolution. Will
    // help with collision detection later.
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
    // If statement to detect if enemy has left the board, and
    // resets enemy to their starting position if it does.
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
    // Width and height properties reflect sprite resolution.
    this.width = 71;
    this.height = 93;
};

Player.prototype.update = function() {
    // If statement to detect if the player has won, by
    // passing the y coordinate of the water. Resets player
    // to starting position.
    if(this.y < 40) {
        this.x = 215;
        this.y = 460;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Declaring variables for later use in player movement.
var xTravel = 100,
    yTravel = 85;

Player.prototype.handleInput = function(key) {
    // Using a switch statement here to provide instuctions
    // on how to handle each of the allowed keys. In addition,
    // I've added if statements to restrict the player's movements
    // to the confines of the canvas.
    switch (key) {
        case 'left':
            if(this.x >= 100) {
                this.x = this.x - xTravel;
            } break;
        case 'right':
            if(this.x <= 315) {
                this.x = this.x + xTravel;
            } break;
        case 'up':
            if(this.y >= 65) {
                this.y = this.y - yTravel;
            } break;yTravel
        case 'down':
            if(this.y <= 375) {
                this.y = this.y + yTravel;
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