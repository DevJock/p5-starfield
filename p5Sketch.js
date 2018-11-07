/**
 * © 2018 Chiraag Bangera.
 */

let Width;
let Height;

let canvas;

let stars = [];

let speed = 1;

function setup() {
    canvas = createCanvas(Width, Height);
    canvas.parent(document.getElementById("canvasHolder"));
    windowResized();
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    textSize(60);
    frameRate(60);
    for (let i = 0; i < 1000; i++) {
        stars.push(new Star(Width, Height));
    }
}


function windowResized() {
    let w = document.getElementById("canvasHolder").offsetWidth;
    let h = document.getElementById("canvasHolder").offsetHeight;
    resizeCanvas(w, h);
    Width = canvas.width;
    Height = canvas.height;
    stars.forEach(star => {
        star.adapt(w,h);
    });
}

function draw() {
    background(0);
    translate(Width / 2, Height / 2);
    stars.forEach(star => {
        star.update(speed);
        star.draw();
    });
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        speed = 10;
    }
}

function keyReleased() {
    if (keyCode === UP_ARROW) {
        speed = 1;
    }
}



class Star {
    constructor(w, h) {
        this.starfield = {w:0,h:0};
        this.adapt(w,h);
        this.color = color(random(0,255),random(0,125),random(0,255));
    }

    adapt(w,h){
        this.starfield.w = w;
        this.starfield.h = h;
        this.x = random(-this.starfield.w / 2, this.starfield.w / 2);
        this.y = random(-this.starfield.h / 2, this.starfield.h / 2);
        this.z = random(this.starfield.w / 2);
        this.pz = this.z;
        this.diameter = random(4, 16); 
    }

    update(speed) {
        this.z -= 1 * speed;
        if (this.z < 1) {
            this.z = this.starfield.w / 2;
            this.x = random(-this.starfield.w / 2, this.starfield.w / 2);
            this.y = random(-this.starfield.h / 2, this.starfield.h / 2);
            this.pz = this.z;
        }
    }

    draw() {
        fill(this.color);
        strokeWeight(0);
        let sx = map(this.x / this.z, 0, 1, 0, this.starfield.w / 2);
        let sy = map(this.y / this.z, 0, 1, 0, this.starfield.h / 2);
        ellipse(sx, sy, map(this.z, 0, this.starfield.w/2, this.diameter, 0));
        let px = map(this.x / this.pz, 0, 1, 0, this.starfield.w / 2);
        let py = map(this.y / this.pz, 0, 1, 0, this.starfield.h / 2);
        this.pz = this.z;
        strokeWeight(2);
        stroke(this.color);
        line(px, py, sx, sy);

    }
}
