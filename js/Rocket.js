class Rocket {
    constructor() {
        this.reset();
    }

    move() {
        this.pos = this.pos.add(this.vel);
        if (this.pos.y >= height) {
            rockets.splice(rockets.indexOf(this), 1);
            this.explode();
        }
    }

    draw() {
        push();
        strokeWeight(1);
        fill('black');
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        triangle(-ROCKET_LENGTH / 3, -ROCKET_WIDTH, 0, 0, -ROCKET_LENGTH / 3, ROCKET_WIDTH);
        triangle(-ROCKET_LENGTH, -ROCKET_WIDTH - ROCKET_WIDTH / 3, -ROCKET_LENGTH + ROCKET_LENGTH / 3, 0, -ROCKET_LENGTH, ROCKET_WIDTH + ROCKET_WIDTH / 3);
        fill('gray');
        rect(-ROCKET_LENGTH / 2, 0, ROCKET_LENGTH, ROCKET_WIDTH, 2);
        fill('#FF3030');
        arc(0, 0, ROCKET_WIDTH, ROCKET_WIDTH, -90, -270);
        pop();
    }

    reset() {
        this.pos = createVector(ROCKET_LENGTH, height - ROCKET_LENGTH - 20);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.fuel = 100;
        this.isEngineOn = false;
    }

    launch(force) {
        this.applyForce(createVector(0, -0.05));
        setTimeout(() => {
            this.isEngineOn = true;
        }, 1200);
    }

    manageFuel() {
        if (this.isEngineOn) this.fuel = this.fuel - 0.8;
        if (this.fuel <= 0 && this.isEngineOn) {
            this.acc = createVector(0, 0);
            this.isEngineOn = false;
        } 
        if (debug) {
            textSize(16);
            if (!this.isEngineOn) {
                fill('red');
                text('ENGINE OFF', this.pos.x + 10, this.pos.y + 20);
            }
            else {
                fill('blue');
                text(`Fuel: ${Math.round(this.fuel)}%`, this.pos.x + 10, this.pos.y + 20);
            }
        }
        if (this.isEngineOn) {
            this.drawFire();
        }
    }

    drawFire() {
        push();
        noStroke();
        fill('rgba(255, 49, 49, 0.8)');
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        ellipse(-ROCKET_LENGTH - ROCKET_WIDTH / 2, 0, random(ROCKET_WIDTH * 2, ROCKET_WIDTH * 3), random(ROCKET_WIDTH * 1.5, ROCKET_WIDTH * 3));
        pop();
    }

    explode() {
        push();
        noStroke();
        fill('#B71C1C');
        circle(this.pos.x, this.pos.y, 100);
        fill('#FFC107');
        circle(this.pos.x, this.pos.y, 50);
        fill('#FF5722');
        circle(this.pos.x, this.pos.y, 30);
        pop();
    }

    applyForce(force) {
        this.acc = this.acc.add(force);
        this.vel = this.vel.add(this.acc);
    }
}