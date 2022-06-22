let debug = false

let gravity
let thruster
let fuel = 100

let isFuelEnded = false
let canLaunch = true
let gameOver = false

const ROCKET_LENGTH = 30
const ROCKET_WIDTH = 4
const ROCKET_THRUST = 0.001

let isHolded = false

let rockets = []

let ufo
let debounceY = createDebouncer(100)
let debounceX = createDebouncer(50)

function setup() {
    frameRate(60);
    let cnv = createCanvas($(window).width(), $(window).height(),)
    angleMode(DEGREES)
    gravity = createVector(0, 0.0005)
    ufo = new Ufo()
    cnv.mousePressed(restart)
}

function draw() {
    background("#5e94d6");

    const drawer = new Drawer();
    drawer.drawLand();

    rockets.forEach(rocket => {
        rocket.angle = -createVector(mouseX - rocket.pos.x, mouseY - rocket.pos.y).heading();
        rocket.move();
        rocket.manageFuel();
        rocket.draw();
        thruster = createVector(cos(rocket.angle), -sin(rocket.angle));
        thruster.mult(ROCKET_THRUST);
        if (rocket.isEngineOn) rocket.applyForce(thruster);
        rocket.applyForce(gravity);
        if (debug) drawArrows(rocket);
    })
    if (canLaunch && isHolded) {
        let rocket = new Rocket();
        rocket.launch();
        rockets.push(rocket);
        canLaunch = false;
        setTimeout(() => { canLaunch = true; }, 700);
    }

    ufo.applyForce(createVector(0, 0.2))
    if (ufo.pos.y >= 200) debounceY(() => ufo.applyForce(createVector(0, -0.8)))
    debounceX(() => {
        if (ufo.pos.x > width / 40) ufo.applyForce(createVector(random(-0.5), 0))
        if (ufo.pos.x < width - width / 40) ufo.applyForce(createVector(random(0.5), 0))
    })
    ufo.move()
    ufo.draw()
    ufo.drawHealth()
    rockets = rockets.filter(rocket => {
        const hit = ufo.detectCollision({
            x: rocket.pos.x,
            y: rocket.pos.y
        })
        if (hit && !ufo.immortal) {
            if (ufo.health == 1) {
                gameOver = true
                noLoop()
                textSize(64)
                fill(74, 102, 150)
                textAlign(CENTER)
                text("YOU WON", width / 2, height / 2)
            }
            else { 
                ufo.hit()
            }
            rocket.explode()
            return false
        }
        return true
    })

    drawer.drawTruck()
    drawer.drawTrajectory()
}

$('body').keyup(e => {
    if(e.keyCode == 32){
        debug = !debug
    }

    if(e.keyCode == 13){
        restart()
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

function createDebouncer(time) {
    let timeout
    return function(func) {
        if (timeout) return
        setTimeout(null, time)
        func()
    }
}

function restart() {
    if (!gameOver) return

    gameOver = false
    ufo = new Ufo()
    rockets = []
    loop()
}