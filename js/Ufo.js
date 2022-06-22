class Ufo {
    constructor() {
        this.pos = createVector(50, height - height * 0.8)
        this.vel = createVector(0, 0)
        this.width = 80
        this.height = 60
        this.health = 12
        this.maxHealth = this.health
        this.immortal = false
        this.blinkFlag = true
    }

    applyForce(force) {
        this.vel.add(force)
    }

    move() {
        this.pos.add(this.vel)
    }

    draw() {
        let glassColor = "#383838"
        let baseColor = "#2e2e2e"

        if (this.immortal) {
            if (this.blinkFlag) {
                this.blinkFlag = !this.blinkFlag
                glassColor = "red"
                baseColor = "red"
                setTimeout(() => this.blinkFlag = !this.blinkFlag, 100)
            }
        }

        push()
        translate(this.pos.x, this.pos.y)
        noStroke()
        fill(255, 255, 255, 100)
        ellipse(0, 0 - 10, this.width / 2, 25) // glass
        fill(glassColor)
        ellipse(0, 5, this.width / 2, 18);
        fill(baseColor)
        ellipse(0, 0, this.width, 18) // base
        pop()
    }

    drawHealth() {
        const barWidth = width / 2
        const barHeight = 20
        const barPadding = 20
        const cellWidth = barWidth / this.maxHealth
        push()
        noStroke()
        translate(width / 2, barPadding)
        fill("black")
        text("UFO")
        pop()

        push()
        noStroke()
        translate(width / 2 - barWidth / 2, barPadding)
        fill("gray")
        rect(0, 0, barWidth, barHeight)
        fill("#eb4034")
        rect(0, 0, this.health * cellWidth, barHeight)
        pop()
    }

    detectCollision(cords) {
        if (this.pos.x + this.width / 2 > cords.x && this.pos.x - this.width / 2 < cords.x) {
            if (this.pos.y + this.height / 2 > cords.y && this.pos.y - this.height / 2 < cords.y) {
                return true
            }
        }
        return false
    }

    hit() {
        this.health--
        this.immortal = true
        setTimeout(() => this.immortal = false, 500)
    }
}