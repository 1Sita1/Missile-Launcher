class Drawer {
    drawLand() {
        push();
        noStroke();
        fill('#388E3C');
        rect(0, height - 20, width, 20);
        pop();
    }

    drawTruck() {
        push();
        translate(ROCKET_LENGTH + ROCKET_LENGTH / 2, height);
        noStroke();
        fill('#383838');    // Base
        rect(-5, -30, 60, 10);
        fill('#141414');    // Wheels
        circle(0, -35 / 2, 10);
        circle(12, -35 / 2, 10);
        circle(50, -35 / 2, 10);
        fill('#383838');    // Cabin
        rect(35, -45, 20, 15);
        fill('#29B6F6');    // Glass
        rect(48, -40, 7, 5);
        fill('#0b2608');    // Launcher
        rect(-ROCKET_LENGTH / 2 - ROCKET_WIDTH - 5, -30 - ROCKET_LENGTH, 15, ROCKET_LENGTH + 10);
        pop();
    }

    drawTrajectory() {
        const padding = 30
        push()
        drawingContext.setLineDash([5, 10, 30, 10])
        stroke(222, 222, 222, 120)
        line(padding, height - padding, mouseX, mouseY)
        pop()
    }
}