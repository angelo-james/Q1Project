

// ============================================================

//LOCAL STORAGE/USER REGISTER

// ============================================================
var users = {};
var modal = document.querySelector('.modal-dialog');

function store() {
    var modal = document.querySelector('.modal-dialog');
    var startGameBtn = document.querySelector('.startGameBtn');
    var username = document.querySelector('#username').value;
    var password = document.querySelector('#password').value;

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    if (users[username] !== undefined) {
        return alert('Username is already in use. Please pick a new name.');
    }
    
    if (users['username'] === undefined) {
        
        users[username] = password; 
        
    }

    var usersStorage = users;
    localStorage.setItem('usersStorage', JSON.stringify(users));

    modal.style.display = 'none';
    startGameBtn.style.display = 'block';
}
    var myStorage = localStorage.getItem('username');

// ============================================================

//Local storage highscore keeper

// ===========================================================/
var currentscore = 0;
var highscore = 0;
var newHighScore = getHighScore;
var highscoreStorage = localStorage.setItem('currentscore', highscore);
var getHighScore = localStorage.getItem('highscore');


// ============================================================

// FONZY BIRD GAME

// ============================================================
var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

function startGame() {
    cvs.style.display = 'block';
    draw();
} 

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var trollBg = document.querySelector('#bg-img');


var fly = new Audio();
var scor = new Audio();
var trollSound = new Audio();

fly.src = 'assets/images/bark.mp3';
scor.src = '';
trollSound.src = '';
//Find images and pluggin in src to load images onto game

bird.src = 'assets/images/fonzy2.0.png';
bg.src = 'assets/images/bg.png';
fg.src = 'assets/images/fg.png';
pipeNorth.src = 'assets/images/pipeNorth.png';
pipeSouth.src = 'assets/images/pipeSouth.png';

//Creats the gap after the pipe and before the southpipe starts
var gap = 100;
var constant = pipeNorth.height+gap;

//gives the starting position for the player
var bx = 10;
var by = 150;

//creates gravity so that the player sprite moves down the y axis
var gravity = 2;
//a score counter to increment by one as the player passes through the pipes

//adding an eventlistener to wait for the user to pressdown on a key
document.addEventListener('keydown',moveUp);

function moveUp() {
    var key = event.keyCode;
    // var 
    //specifically waiting for the user to press down on the keycode '32' which is the space bar
    // if (key === 32) {
        by -= 30;
    // }    
}

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

function draw() {
    
    ctx.drawImage(bg,0,0);

    for (var i = 0; i < pipe.length; i++) {
        // score++;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);

        pipe[i].x-=2;
        
        if (pipe[i].x === 130) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }
        // if (bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width
        // && (by <= pipe[i].y + pipeNorth.height || by+bird.height >= pipe[i].y+constant)
        // || by + bird.height >= cvs.height - fg.height)
        //  {  
        //     if (currentscore >= 5) {
        //         trollBg.style.display = 'block';

        //         cvs.style.display = 'none';
        //     }
        //     // add flag asking if game is over!!!!!!
        //     // confirm('GAME OVER!! Your currentscore was ' + currentscore );
        //     location.reload();
        // }
        if (currentscore > highscore) {
            localStorage.setItem('currentscore', currentscore);
        } 
        if (pipe[i].x == 10) {
            currentscore++;
        }
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bird,bx,by);

    by += gravity;

    ctx.fillStyle = 'red';
    ctx.font = '20px Comic Sans MS';
    ctx.fillText('Score : ' + currentscore, 10,cvs.height-20);
    ctx.fillText(myStorage +"'s" + " HIGHSCORE : " + getHighScore, 10,cvs.height-475);
    
    requestAnimationFrame(draw);
    
}


// ============================================================

//LOCAL STORAGE/USER LOGIN

// ============================================================
function checkUser() {
    var username = document.querySelector('#username').value;
    var password = document.querySelector('#password').value;
    var obj = localStorage.getItem('usersStorage');

    for (var username in obj) {
        if (username !== undefined && obj[username] === password) {
            return alert('you may enter');
        }
        return alert('Username or Password does not match');
    }
    
}
