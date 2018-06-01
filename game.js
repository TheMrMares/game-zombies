document.addEventListener('DOMContentLoaded', function(){
    //Pre
    myCanvas = document.getElementById('myCanvas');
    ctx = myCanvas.getContext('2d');
    var gameInterval = window.setInterval(game, 1000/60);
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
    //Calculate
    myPlayer.vy += myBackground.gravity;
    myPlayer.x += myPlayer.vx*5;
    myPlayer.y += myPlayer.vy*5;
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

    myBackground.boxes.forEach(function(item, index){
        if((myPlayer.x >= item.x && myPlayer.x <= item.x + item.w) || (myPlayer.x + myPlayer.w >= item.x && myPlayer.x + myPlayer.w <= item.x + item.w) && (myPlayer.oldy + myPlayer.h < item.y || myPlayer.oldy > item.y + item.h)){
            if(myPlayer.y + myPlayer.h >= item.y && myPlayer.y + myPlayer.h < item.y + item.h){
                myPlayer.y = item.y - myPlayer.h - 1;
                myPlayer.vy = 0;
            }
            if(myPlayer.y <= item.y + item.h && myPlayer.y > item.y){
                myPlayer.y = item.y + item.h + 1;
                myPlayer.vy = 0;
            }
        }
        if((myPlayer.y > item.y && myPlayer.y <= item.y + item.h) || (myPlayer.y + myPlayer.h > item.y && myPlayer.y + myPlayer.h < item.y + item.h) || ((item.y > myPlayer.y && item.y < myPlayer.y + myPlayer.h) || (item.y + item.h >= myPlayer.y && item.y + item.h <= myPlayer.y + myPlayer.h))){
            if(myPlayer.x + myPlayer.w >= item.x && myPlayer.x + myPlayer.w <item.x + item.w){
                myPlayer.x = item.x - myPlayer.w -1;
                myPlayer.vx = 0;
            }
            if(myPlayer.x <= item.x + item.w && myPlayer.x > item.x){
                myPlayer.x = item.x + item.w + 1;
                myPlayer.vx = 0;
            }
        }
        

        ctx.fillStyle = 'orange';
        ctx.fillRect(myBackground.x + item.x,myBackground.y + item.y,item.w,item.h);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(myCanvas.width/2 - myPlayer.w/2,myCanvas.height/2 - myPlayer.h/2,myPlayer.w,myPlayer.h);
    myPlayer.oldy = myPlayer.y;
}

//Objects
function Background(x,y, w, h, res){
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.res = res
    this.gravity = 0.2;
    this.boxes = [new Box(300,380,20,50),new Box(400,450,20,50),new Box(600,470,20,20)];
}

function Player(x, y, w, h) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.oldy = 0;
}
function Box(x,y,w,h){
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
}

//Functions
function pushKey(evt) {
    switch(evt.keyCode){
        case 32:
            myPlayer.vy = -3; 
            break;
        case 37:
            myPlayer.vx = -1;
            break;
        case 38:
            //myPlayer.vx = 0; myPlayer.vy = -1; 
            break;
        case 39:
            myPlayer.vx = 1;
            break;
        case 40:
            myPlayer.vy = 1; 
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
