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
    myPlayer.x1 += myPlayer.vx*5;
    myPlayer.y1 += myPlayer.vy*5;
    if(myPlayer.x1 < 0){
        myPlayer.x1 = 0;
    }
    if(myPlayer.x1 > myBackground.w){
        myPlayer.x1 = myBackground.w;
    }
    if(myPlayer.y1 < 0){
        myPlayer.y1 = 0;
    }
    if(myPlayer.y1 > myBackground.h - myPlayer.h){
        myPlayer.y1 = myBackground.h - myPlayer.h
    }

    myBackground.x = 0-myPlayer.x1 + myCanvas.width/2 - myPlayer.w/2;
    myBackground.y = 0-myPlayer.y1 + myCanvas.height/2 - myPlayer.h/2;

    //Draw
    ctx.fillStyle = 'grey';
    ctx.fillRect(0,0,500,500);

    ctx.drawImage(myBackground.res, myBackground.x, myBackground.y);

    myBackground.boxes.forEach(function(item, index){
        
        if(Math.abs(myPlayer.x1 - item.x1) <= item.w){
            if(myPlayer.y2 >= item.y1 && myPlayer.y2 < item.y2 && myPlayer.vy>= 0){
                myPlayer.vy = 0;
                myPlayer.y1 = item.y1 - myPlayer.h;
            }
            if(myPlayer.y1 <= item.y2 && myPlayer.y1 > item.y1){
                myPlayer.y1 = item.y2;
                myPlayer.vy = 0;
            }
        }
        if(Math.abs(myPlayer.y1 - item.y1) <= item.h){
            if(myPlayer.x2 >= item.x1 && myPlayer.x2 < item.x2 && myPlayer.vx >= 0){
                myPlayer.x1 = item.x1 - myPlayer.w - 5;
            }
            if(myPlayer.x1 <= item.x2 && myPlayer.x1 > item.x1 && myPlayer.vx <= 0){
                myPlayer.x1 = item.x2 + 5;
            }
        }

        ctx.fillStyle = 'orange';
        ctx.fillRect(myBackground.x + item.x1,myBackground.y + item.y1,item.w,item.h);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(myCanvas.width/2 - myPlayer.w/2,myCanvas.height/2 - myPlayer.h/2,myPlayer.w,myPlayer.h);
    myPlayer.saveCoordinates();
    //console.log('#X: '+myPlayer.x1+' #Y: '+myPlayer.y1+ ' #oldX: '+myPlayer.oldx+' #oldY: '+myPlayer.oldy);
}

//Objects
function Background(x,y, w, h, res){
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.res = res
    this.gravity = 0.2;
    this.boxes = [new Box(200,380,20,50),new Box(400,450,20,50),new Box(600,470,20,20)];
}

function Player(x, y, w, h) {
    this.w = w;
    this.h = h;
    this.x1 = x;
    this.y1 = y;
    this.x2 = x + w;
    this.y2 = y + h;
    this.vx = 0;
    this.vy = 0;
    this.oldy = 0;
    this.olx = 0;
    this.saveCoordinates = function() {
        this.x2 = this.x1 + this.w;
        this.y2 = this.y1 + this.h;
        this.oldy = this.y1;
        this.oldx = this.x1;
    }
}
function Box(x,y,w,h){
    this.w = w;
    this.h = h;
    this.x1 = x;
    this.y1 = y;
    this.x2 = x + w;
    this.y2 = y + h;
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
