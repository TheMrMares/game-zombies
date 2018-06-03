//Objects
function Background(x,y, w, h, res){
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.res = res
    this.gravity = 0.2;
    this.boxes = [new Box(200,380,20,50),new Box(400,450,20,50),new Box(600,470,20,20),new Box(700,470,200,20)];
    this.bullets = [];
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
function Bullet(x,y,tx,ty){
    this.x = x;
    this.y = y;
    this.tx = tx;
    this.ty = ty;
    if(tx < x){
        this.vx = -Math.abs(x-tx)/5;
    } else {
        this.vx = Math.abs(x-tx)/5;
    }
    if(ty < y){
        this.vy = -Math.abs(y-ty)/5;
    } else {
        this.vy = Math.abs(y-ty)/5;
    }
}