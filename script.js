// ============================================================

//LOCAL STORAGE/USER REGISTER

// ============================================================
function store() {
    var username = document.querySelector('#username').value;
    localStorage.setItem('username', username);
}


// ============================================================

// FONZY BIRD GAME

// ============================================================
var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
var currentscore = 0;
var modal = document.querySelector('.modal-dialog');

function startGame() {
    modal.style.display = 'none';
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

fly.src = 'assets/images/bark.wav';
scor.src = 'assets/images/coin.wav';
trollSound.src = 'assets/images/scream.wav';
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
window.addEventListener('touchstart', moveUp);

function moveUp() {
        fly.play();
        by -= 30;
}

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

function draw() {
    
    ctx.drawImage(bg,0,0);

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);

        pipe[i].x-=2;
        
        if (pipe[i].x === 120) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }
        if (bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width
            && (by <= pipe[i].y + pipeNorth.height || by+bird.height >= pipe[i].y+constant)
            || by + bird.height >= cvs.height - fg.height) {

            if (currentscore >= 5) {
                trollSound.play();
                trollBg.style.display = 'block';
                cvs.style.display = 'none';
                modal.style.display = 'none';
            } else {
                location.reload();
            }
        }
        if (pipe[i].x == 10) {
            scor.play();
            currentscore++;
        }
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bird,bx,by);

    by += gravity;

    ctx.fillStyle = 'red';
    ctx.font = '20px Comic Sans MS';
    ctx.fillText(localStorage.getItem('username') + "'s Score : " + currentscore, 10,cvs.height-20);
    ctx.fillText("HIGHSCORE : " + 10, 10,cvs.height-475);
    
    requestAnimationFrame(draw);
}
// ============================================================

//LOCAL STORAGE/USER LOGIN

// ============================================================
// function checkUser() {
//     var username = document.querySelector('#username').value;
//     var password = document.querySelector('#password').value;
//     var obj = localStorage.getItem('usersStorage');

//     for (var username in obj) {
//         if (username !== undefined && obj[username] === password) {
//             return alert('you may enter');
//         }
//         return alert('Username or Password does not match');
//     }
    
// }
