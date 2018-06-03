document.addEventListener('DOMContentLoaded', function(){
    //Pre
    loadResources();
    init();
    myCanvas = document.getElementById('myCanvas');
    ctx = myCanvas.getContext('2d');
    var gameInterval = window.setInterval(game, 1000/60);
    window.addEventListener('keydown', pushKey);
    window.addEventListener('keyup', releaseKey);
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('click', shot);
});

//Inits
function init(){
    myPlayer = new Player(100,100,20,50);
    myBackground = new Background(0,0,1000,500, res[0]);
    mx = my = 0;
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
    console.log(myBackground.bullets.length);
    myBackground.bullets.forEach(function(item,index){

        item.x += item.vx;
        item.y += item.vy;
        
        if(item.x < 0){
            delete item;
        }

        ctx.fillStyle = 'yellow';
        ctx.fillRect(myBackground.x + item.x, myBackground.y + item.y,10,10);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(myCanvas.width/2 - myPlayer.w/2,myCanvas.height/2 - myPlayer.h/2,myPlayer.w,myPlayer.h);

    ctx.beginPath();
    ctx.moveTo(myCanvas.width/2 - myPlayer.w/2,myCanvas.height/2 - myPlayer.h/2);
    ctx.lineTo(mx,my);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.closePath();

    myPlayer.saveCoordinates();
}

//Functions
function pushKey(evt) {
    switch(evt.keyCode){
        case 87:
            myPlayer.vy = -3; 
            break;
        case 65:
            myPlayer.vx = -1;
            break;
        case 68:
            myPlayer.vx = 1;
            break;
        case 83:
            myPlayer.vy = 1; 
            break;
    }
}
function releaseKey(evt) {
    switch(evt.keyCode){
        case 65:
            myPlayer.vx = 0;
            break;
        case 68:
            myPlayer.vx = 0;
            break;
        case 83:
            myPlayer.vy = 0; 
            break;
    }
}

function loadResources(){
    res = [];
    res[0] = document.getElementById('resBackground');
}
function mouseMove(evt){
    var rect = myCanvas.getBoundingClientRect();
    mx = evt.clientX-rect.left;
    my = evt.clientY-rect.top;
}
function shot(){
    myBackground.bullets.push(new Bullet(myPlayer.x1, myPlayer.y1,mx - myBackground.x, my - myBackground.y));
}
