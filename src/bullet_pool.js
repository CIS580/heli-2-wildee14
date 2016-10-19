module.export = exports = BulletPool;

function BulletPool(maxSize) {
    this.pool = new Float32Array(4*maxSize);
    this.end = 0;
    this.max = maxSize;
}

BulletPool.prototype.add(position,velocity) {
  if(this.end < this.maxSize){
  this.pool[this.end*4]  = position.x;
  this.pool[this.end*4 +1]  = position.y;
  this.pool[this.end*4 +2]  = velocity.x;
  this.pool[this.end*4 +3]  = velocity.y;
  this.end++;
  }
}
BulletPool.prototype.update(elapsedTime,callback) {
  for (var i = 0; i < this.end; i++) {
    this.pool[i*4] += this.pool[4*i+2];
    this.pool[i*4+1] += this.pool[4*i+3];
    if(callback({x:this.pool[4*i], y:this.pool[4*i+2]})){
        this.pool[4*i] = this.pool[4*(this.end-1)];
        this.pool[4*i+1] = this.pool[4*(this.end-1)+1];
        this.pool[4*i+2] = this.pool[4*(this.end-1)+2];
        this.pool[4*i+3] = this.pool[4*(this.end-1)+3];
        this.end--;
        i--;
    }
  }
}
BulletPool.prototype.render = function (elapsedTime, ctx) {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = "white";
  for (var i = 0; i < this.end; i++) {
    ctx.moveTo(this.pool[4*i], this.pool[4*i+1]);
    ctx.arc(this.pool[4*i], this.pool[4*i+2],2,0,2*Math.Pi)
  }
  ctx.fill();
  ctx.restore();
};
