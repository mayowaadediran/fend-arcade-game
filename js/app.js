class Enemy  {
  constructor(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png'
  }

  update(dt) {
    if (this.x < 505) {
      this.x += 200 * this.speed * dt;
    }
    else {
      this.x = -100;
    }

    for (let enemy of allEnemies) {
      if (this.y === player.y && this.x + 40 >= player.x && this.x - 40 <= player.x) {
        player.resetPlayer();
      }
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
   
// Draw the enemy on the screen, required method for game


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y; 
    this.sprite = 'images/char-boy.png'
  }

  update(dt) {
    if (this.y < 30) {
      this.resetPlayer();
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(keyPressed) {
    if (keyPressed === 'left' && this.x > 33) {
      this.x -= 100;
    }
    else if (keyPressed === 'up' && this.y > 18) {
      this.y -= 83;
    }
    else if (keyPressed === 'right' && this.x < 400) {
      this.x += 100;
    }
    else if (keyPressed === 'down' && this.y < 380) {
      this.y += 83;
    }
  }

  resetPlayer() {
    this.x = 200;
    this.y = 405;
  }
}

// Now instantiate your objects.

// Place the player object in a variable called player
let player = new Player(200, 405);

// Place all enemy objects in an array called allEnemies
let allEnemies = [new Enemy(0, 73, 1), new Enemy(-4, 73, 2), new Enemy(-8, 156, 1.5), new Enemy(-6, 239, 1.6)];


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
