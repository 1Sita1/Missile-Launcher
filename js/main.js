let debug = false;

let gravity;
let thruster;
let fuel = 100;

let isFuelEnded = false;
let canLaunch = true;

const ROCKET_LENGTH = 30;
const ROCKET_WIDTH = 4;
const ROCKET_THRUST = 0.001;

let isHolded = false;

let rockets = [];

function setup() {
    frameRate(60);
    createCanvas($(window).width(), $(window).height(),);
    angleMode(DEGREES); 
}

function draw() {
    background("#039BE5");

    const drawer = new Drawer();
    drawer.drawLand();

    rockets.forEach(rocket => {
        rocket.angle = -createVector(mouseX - rocket.pos.x, mouseY - rocket.pos.y).heading();
        rocket.move();
        rocket.manageFuel();
        rocket.draw();
        gravity = createVector(0, 0.0005);
        thruster = createVector(cos(rocket.angle), -sin(rocket.angle));
        thruster.mult(ROCKET_THRUST);
        if (rocket.isEngineOn) rocket.applyForce(thruster);
        rocket.applyForce(gravity);
        if (debug) drawArrows(rocket);
    });
    if (canLaunch && isHolded) {
        let rocket = new Rocket();
        rocket.launch();
        rockets.push(rocket);
        canLaunch = false;
        setTimeout(() => { canLaunch = true; }, 700);
    }

    drawer.drawTruck();
}

$('body').keyup(e => {
    if(e.keyCode == 32){
        debug = !debug;
    }
});

function mousePressed() {
    isHolded = true;
}

function mouseReleased() {
    isHolded = false;
}

function drawArrows(rocket) {
    strokeWeight(3);
    let acc_vec = createVector(rocket.acc.x, rocket.acc.y).mult(1000);
    let vel_vec = createVector(rocket.vel.x, rocket.vel.y).mult(20);
    drawArrow(rocket.pos, acc_vec, 'blue');
    drawArrow(rocket.pos, vel_vec, 'red');
}

function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}