document.addEventListener('DOMContentLoaded', function(){
    //Pre
    var myCanvas = document.getElementById('myCanvas');
    ctx = myCanvas.getContext('2d');
    var gameInterval = window.setInterval(game, 1000/15);
    window.addEventListener('keydown', pushKey);
    window.addEventListener('keyup', releaseKey);
    //Resources
    loadResources();
    init();
});

//Inits
function init(){
    myPlayer = new Player(100,100,20,50);
    myBackground = new Background(0,0,res[0].width,res[0].height, res[0]);
}

//Game loop
function game(){
    //Calculate
    myBackground.x -= myPlayer.vx*10;
    myBackground.y -= myPlayer.vy*10;

    //Draw
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,500,500);

    ctx.drawImage(myBackground.res, myBackground.x, myBackground.y);

    ctx.fillStyle = 'red';
    ctx.fillRect(myPlayer.x,myPlayer.y,myPlayer.w,myPlayer.h);
}

//Objects
function Background(x,y, w, h, res){
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.res = res;
}

function Player(x, y, w, h) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
}

//Functions
function pushKey(evt) {
    switch(evt.keyCode){
        case 37:
            myPlayer.vx = -1; myPlayer.vy = 0; 
            break;
        case 38:
            myPlayer.vx = 0; myPlayer.vy = -1; 
            break;
        case 39:
            myPlayer.vx = 1; myPlayer.vy = 0; 
            break;
        case 40:
            myPlayer.vx = 0; myPlayer.vy = 1; 
            break;
    }
}
function releaseKey(evt) {
    switch(evt.keyCode){
        case 37:
            myPlayer.vx = 0; 
            break;
        case 38:
            myPlayer.vy = 0; 
            break;
        case 39:
            myPlayer.vx = 0;
            break;
        case 40:
            myPlayer.vy = 0; 
            break;
    }
}

function loadResources(){
    res = [];
    res[0] = document.getElementById('resBackground');
}
