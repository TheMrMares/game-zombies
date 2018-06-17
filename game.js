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
    myPlayer = new Player(100,100,20,50,new Sprite(480,50,40,50,res[1]));
    myBackground = new Background(0,0,1000,500, res[0]);
    mx = my = 0;
    frameCounter = 0;
}

//Game loop
function game(){
    frameCounter += 1;
    myPlayer.saveCoordinates();
    //Calculate
    myPlayer.vy += myBackground.gravity;
    myPlayer.x1 += myPlayer.vx*5;
    myPlayer.y1 += myPlayer.vy*5;
    myPlayer.refreshCoordinates();
    if(myPlayer.x1 < 0){
        myPlayer.x1 = 0;
    }
    if(myPlayer.x2 > myBackground.w){
        myPlayer.x1 = myBackground.w - myPlayer.w;
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
    ctx.fillRect(0,0,800,800);

    ctx.fillStyle = 'dodgerblue';
    ctx.fillRect(myBackground.x, myBackground.y,myBackground.w, myBackground.h);

    myBackground.boxes.forEach(function(item, index){
        
            if( ((myPlayer.y1 >= item.y1 && myPlayer.y1 <= item.y2) || (myPlayer.y2 > item.y1 && myPlayer.y2 <= item.y2)) ||
            ((item.y1 >= myPlayer.y1 && item.y1 < myPlayer.y2) || (item.y2 >= myPlayer.y1 && item.y2 <= myPlayer.y2)) ){
                if(myPlayer.x2 >= item.x1 && myPlayer.x2 < item.x2){
                    myPlayer.x1 = myPlayer.oldx;
                    myPlayer.refreshCoordinates();
                }
                if(myPlayer.x1 <= item.x2 && myPlayer.x1 > item.x1){
                    myPlayer.x1 = myPlayer.oldx;
                    myPlayer.refreshCoordinates();
                }
            }
            if( ((myPlayer.x1 >= item.x1 && myPlayer.x1 <= item.x2) || (myPlayer.x2 >= item.x1 && myPlayer.x2 <= item.x2)) ||
                ((item.x1 >= myPlayer.x1 && item.x1 <= myPlayer.x2) || (item.x2 >= myPlayer.x1 && item.x2 <= myPlayer.x2)) ){
                if(myPlayer.y2 >= item.y1 && myPlayer.y2 < item.y2){
                    myPlayer.y1 = myPlayer.oldy;
                    myPlayer.refreshCoordinates();
                    myPlayer.vy = 0;
                }
                if(myPlayer.y1 <= item.y2 && myPlayer.y1 > item.y1){
                    myPlayer.y1 = myPlayer.oldy;
                    myPlayer.refreshCoordinates();
                }
            }

        ctx.fillStyle = 'orange';
        ctx.fillRect(myBackground.x + item.x1, myBackground.y + item.y1,item.w,item.h);
    });
    myBackground.bullets.forEach(function(item,index){
        item.x1 += item.vx;
        item.y1 += item.vy;
        item.refreshCoordinates();
        if(item.x1 < 0){
            myBackground.bullets.splice(myBackground.bullets.indexOf(item),1);
        }else if(item.x1 > myBackground.w){
            myBackground.bullets.splice(myBackground.bullets.indexOf(item),1);
        }
        if(item.y < 0){
            myBackground.bullets.splice(myBackground.bullets.indexOf(item),1);
        } else if(item.y1 > myBackground.h){
            myBackground.bullets.splice(myBackground.bullets.indexOf(item),1);
        }
        myBackground.boxes.forEach(function(obj, objIndex){
            if(isCollission(item,obj)){
                myBackground.bullets.splice(myBackground.bullets.indexOf(item),1);
            }
        });

        ctx.fillStyle = 'yellow';
        ctx.shadowColor = 'yellow';
        ctx.shadowBlur = 10;
        ctx.fillRect(myBackground.x + item.x1, myBackground.y + item.y1,item.w, item.h);
        ctx.shadowBlur = 0;
    });
    
    ctx.fillStyle = 'red';
    if(frameCounter%2 == 0 && myPlayer.vx != 0){
        myPlayer.spriteWalk.actual += 40;
        if(myPlayer.spriteWalk.actual == myPlayer.spriteWalk.sw){
            myPlayer.spriteWalk.actual=0;
        }
    }
    if(myPlayer.vx == 0){
        myPlayer.spriteWalk.actual = 0;
    }
    ctx.drawImage(myPlayer.spriteWalk.img,myPlayer.spriteWalk.actual,0,myPlayer.spriteWalk.iw,myPlayer.spriteWalk.ih,myCanvas.width/2 - myPlayer.w/2,myCanvas.height/2 - myPlayer.h/2,myPlayer.w,myPlayer.h);

    ctx.beginPath();
    ctx.moveTo(myCanvas.width/2, myCanvas.height/2 - myPlayer.h/2+5);
    ctx.lineTo(mx,my);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.setLineDash([10, 10]);
    ctx.stroke();
    ctx.closePath();
    if(frameCounter==60){
        frameCounter = 0;
    }
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
            if(myPlayer.vx < 0){
                myPlayer.vx += 1;
            }
            break;
        case 68:
            if(myPlayer.vx > 0){
                myPlayer.vx -= 1;
            }
            break;
        case 83:
            if(myPlayer.vy > 0){
                myPlayer.vy += 1; 
            }
            break;
    }
}

function loadResources(){
    res = [];
    res[0] = document.getElementById('resBackground');
    res[1] = document.getElementById('resPlayer');
}
function mouseMove(evt){
    var rect = myCanvas.getBoundingClientRect();
    mx = evt.clientX-rect.left;
    my = evt.clientY-rect.top;
}
function shot(){
    myBackground.bullets.push(new Bullet(myPlayer.x1, myPlayer.y1,mx - myBackground.x, my - myBackground.y, 3, 3));
}

function isCollission(obj, box){
    if( ((obj.y1 >= box.y1 && obj.y1 <= box.y2) || (obj.y2 > box.y1 && obj.y2 <= box.y2)) ||
    ((box.y1 >= obj.y1 && box.y1 < obj.y2) || (box.y2 >= obj.y1 && box.y2 <= obj.y2)) ){
        if(obj.x2 >= box.x1 && obj.x2 < box.x2){
            obj.x1 = obj.oldx;
            return true;
        }
        if(obj.x1 <= box.x2 && obj.x1 > box.x1){
            return true;
        }
    }

    if( ((obj.x1 >= box.x1 && obj.x1 <= box.x2) || (obj.x2 >= box.x1 && obj.x2 <= box.x2)) ||
        ((box.x1 >= obj.x1 && box.x1 <= obj.x2) || (box.x2 >= obj.x1 && box.x2 <= obj.x2)) ){
        if(obj.y2 >= box.y1 && obj.y2 < box.y2){
            return true;
        }
        if(obj.y1 <= box.y2 && obj.y1 > box.y1){
            return true;
        }
    }
    return false;
}