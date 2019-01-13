let welcomeModal = document.getElementById('welcome-modal');
let winModal = document.getElementById('win-modal');
let loseModal = document.getElementById('lose-modal');
let overlay = document.querySelector(".overlay")

function startGame() {
  welcomeModal.style.display = "none";
  overlay.classList.add("hide");
}

function loseGame() {
  loseModal.style.display = "flex";
  overlay.classList.remove("hide");
}

function winGame() {
  winModal.style.display = "flex";
  overlay.classList.remove("hide");
}

function resetGame() {
  window.location.reload();
}

//unlocking gems....
//place gems in the water blocks so that when a player hits the block he unlocks
//the gems...gems can give extra lives and stones will reduce lives 
//keyBlock class to hold the keys to be unlocked
//rendering lives 
//How will the lives reduce - when the player hits 
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
        allLives.pop();
      }
    }

    if (allLives.length === 0) {
      loseGame();
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y; 
    this.sprite = 'images/char-boy.png'
  }

 
  update(dt) {
    for (let key of allKeys) {
      if (key.y - 30 === player.y && key.x - 20 === player.x) {
        player.resetPlayer();
        var keyIndex = allKeys.indexOf(key);
        allKeys.splice(keyIndex, 1);
        
      }
    }

    if (allKeys.length === 0) {
      winGame();
    }

    if (player.y < 5) {
      player.resetPlayer();
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

class Lives {
  constructor (x, y) {
    this.x = x;
    this.y = y; 
    this.sprite = 'images/Heart.png'
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 28, 42);
  }
}

class Key {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Key.png'
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 70, 120);
  }
}

// Now instantiate your objects.

// Place the player object in a variable called player
let player = new Player(200, 405);

// Place all enemy objects in an array called allEnemies
let allEnemies = [new Enemy(0, 73, 1), new Enemy(-4, 73, 2), new Enemy(-8, 156, 1.5), new Enemy(-6, 239, 1.6)];

let allLives = [new Lives(400, 505), new Lives(430, 505), new Lives(460, 505)]; 

let allKeys = [new Key(20, 20), new Key(120, 20), new Key(220, 20), new Key(320, 20), new Key(420, 20) ]

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
