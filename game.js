document.addEventListener('DOMContentLoaded', function(){
    //Pre
    myCanvas = document.getElementById('myCanvas');
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
    myBackground = new Background(0,0,1000,500, res[0]);
}

//Game loop
function game(){
    //console.log('#X: '+myPlayer.x+' #Y: '+myPlayer.y+' #MW: '+myBackground.w+' #MH: '+myBackground.h);
    //Calculate
    myPlayer.x += myPlayer.vx*10;
    myPlayer.y += myPlayer.vy*10;
    if(myPlayer.x < 0){
        myPlayer.x = 0;
    }
    if(myPlayer.x > myBackground.w){
        myPlayer.x = myBackground.w;
    }
    if(myPlayer.y < 0){
        myPlayer.y = 0;
    }
    if(myPlayer.y > myBackground.h - myPlayer.h){
        myPlayer.y = myBackground.h - myPlayer.h
    }

    myBackground.x = 0-myPlayer.x + myCanvas.width/2 - myPlayer.w/2;
    myBackground.y = 0-myPlayer.y + myCanvas.height/2 - myPlayer.h/2;

    //Draw
    ctx.fillStyle = 'grey';
    ctx.fillRect(0,0,500,500);

    ctx.drawImage(myBackground.res, myBackground.x, myBackground.y);

    ctx.fillStyle = 'red';
    ctx.fillRect(myCanvas.width/2 - myPlayer.w/2,myCanvas.height/2 - myPlayer.h/2,myPlayer.w,myPlayer.h);
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
