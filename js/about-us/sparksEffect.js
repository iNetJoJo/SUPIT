
var canvas;
var ctx;
var config = {
    sparkFreq: 1,
    meanSparkSize: 0.004,
    meanSparkLife: 500,
    meanSparkVelocity: [ 2, 6 ],
    sparkSizeVariation: 2,
    sparkBlink: 10, // Lower is more blink
    floorHeight: 0.15
};

var resize = window.resize = function() {
    canvas.height = document.body.offsetHeight;
    canvas.width = document.body.offsetWidth;
};

window.onload = function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    resize();

    config.meanSparkSize = canvas.width*config.meanSparkSize;

    var fire = new Fire(ctx, canvas, canvas.height-canvas.height*config.floorHeight, config);

    var loop = function() {
        window.requestAnimFrame(loop);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fire.update();
        for (var i=0; i<config.sparkFreq; i++) {
            fire.spark(Math.random()*canvas.width);
        }
    };

    window.requestAnimFrame = function(){
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(a) { window.setTimeout(a,1E3/60); };
    }();

    loop();
};

//////////////////////////////////////////////////
var Fire = function Fire(ctx, canvas, y, config) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.y = y;
    this.r = 255;
    this.config = config;
    this.sparks = [ ];
};
Fire.prototype.spark = function(x) {
    this.sparks.push(new Spark(this.ctx, x, this.y, this.config));
};
Fire.prototype.updateColor = function() {
    this.r += (Math.random()-0.5)*10;
    this.r = Math.round(Math.min(80, Math.max(60, this.r)));
};
Fire.prototype.update = function() {
    this.updateColor();
    this.ctx.beginPath();
    this.ctx.rect(0, this.y, this.canvas.width, this.config.meanSparkSize);
    this.ctx.fillStyle = 'rgba('+this.r+', 0, 0, 1)';
    this.ctx.fill();

    for (var i=0; i<this.sparks.length; i++) {
        if (this.sparks[i].update()) { // Spark died
            this.sparks.splice(i, 1);
        }
    }
};

///////////////////////////////////////////////
var Spark = function Spark(ctx, x, y, config) {
    this.ctx = ctx;
    this.pos = [ x, y ];
    this.size = config.meanSparkSize+(Math.random()-0.5)*config.sparkSizeVariation;
    this.v = [
        config.meanSparkVelocity[0]*(Math.random()-0.5),
        -1*config.meanSparkVelocity[1]*Math.random()
    ];
    this.c = [
        Math.floor(Math.random()*155)+100,
        Math.floor(Math.random()*80),
        0
    ];
    this.life = this.lifeOrig = Math.floor(config.meanSparkLife*Math.random());
    this.config = config;
};
Spark.prototype.move = function() {
    for (var i=0; i<2; i++) {
        this.pos[i] += this.v[i]*(1-this.life/this.lifeOrig);
    }
};
Spark.prototype.getAlpha = function() {
    return Math.sqrt(this.life/this.lifeOrig)+((Math.random()-0.5)/this.config.sparkBlink);
};
Spark.prototype.update = function() {
    this.move();
    if (!(this.life--)) { return true; }
    this.ctx.beginPath();
    this.ctx.rect(this.pos[0], this.pos[1], this.size, this.size);
    this.ctx.fillStyle = 'rgba('+this.c[0]+', '+this.c[1]+', '+this.c[2]+', '+this.getAlpha()+')';
    this.ctx.fill();
};