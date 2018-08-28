var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var trollBg = document.querySelector('#bg-img');
console.log(trollBg);

//Find images and pluggin in src to load images onto game

bird.src = "assets/images/fonzy2.0.png";
bg.src = "assets/images/bg.png";
fg.src = "assets/images/fg.png";
pipeNorth.src = "assets/images/pipeNorth.png";
pipeSouth.src = "assets/images/pipeSouth.png";

//Creats the gap after the pipe and before the southpipe starts
var gap = 65;
var constant = pipeNorth.height+gap;

//gives the starting position for the player
var bx = 10;
var by = 150;

//creates gravity so that the player sprite moves down the y axis
var gravity = 2.5;
//a score counter to increment by one as the player passes through the pipes
var score = 0;
//adding an eventlistener to wait for the user to pressdown on a key
document.addEventListener("keydown",moveUp);

function moveUp() {
    var key = event.keyCode;
    //specifically waiting for the user to press down on the keycode "32" which is the space bar
    if (key === 32) {
        by -= 40;
    }    
}
//
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

        pipe[i].x--;

        if (pipe[i].x === 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }
        if (bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width
        && (by <= pipe[i].y + pipeNorth.height || by+bird.height >= pipe[i].y+constant)
        || by + bird.height >= cvs.height - fg.height)
         {  
            trollBg.style.display = 'block';
            // add flag asking if game is over!!!!!!
            if (confirm("GAME OVER!! Your score was " + score )){
                
            }
            location.reload();
        }
        if (pipe[i].x == 5) {
            score++;
        }
    }
    
    // ctx.drawImage(pipeNorth,150,0);
    // ctx.drawImage(pipeSouth,150,0+constant);

    ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bird,bx,by);

    by += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "40px Comic Sans MS";
    ctx.fillText("Score : " + score, 10,cvs.height-20);
    
    requestAnimationFrame(draw);
}

draw();

