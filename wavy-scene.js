var angle = 0;
var offset = 100;
var speed = 0.05;
var scalar;
var oscX, oscY;
var pointA = { x: 0, y: 0 };
var pointB = { x: 800, y: 200 };

var ballArray = [];

Ball = function(x, y, oscillator) {
    this.position = createVector(x, y);
    this.size = 20;
    this.oscillator = oscillator;
    ballArray.push(this);
};

Ball.prototype.Move = function() {
    this.position.y = -oscY + height / 2 + sin(angle + this.oscillator * (oscX / 100)) * scalar + oscY;
};

Ball.prototype.Display = function() {
    ellipse(this.position.x, this.position.y, this.size, this.size);
};

function initWavy() {
    // noStroke();
    ballArray = [];
    fill(0);
    for (i = 0; i < 21; i++) {
        var Roger = new Ball(width / 20 * (i + 0), height / 2, 0.4 * i);
    }
}

function drawWavy() {
    let lerps = map(sin(frameCount * 0.01), -1, 1, 0, 1);
    oscX = lerp(pointA.x, pointB.x, lerps);
    oscY = lerp(pointA.y, pointB.y, lerps);
    background(255);
    translate(-width / 2, -height / 2);
    scalar = 80 + oscY;
    for (i = 0; i < ballArray.length; i++) {
        ballArray[i].Move();
    }
    for (i = 0; i < ballArray.length; i++) {
        var x = ballArray[i].position.x;
        var y = ballArray[i].position.y;
        if (i < ballArray.length - 1) {
            var x2 = ballArray[i + 1].position.x;
            var y2 = ballArray[i + 1].position.y;
        } else {
            var x2 = x;
            var y2 = y;
        }



        let r1 = map(y, 0, height, 155, 255);
        let g1 = map(y, 0, height, 255, 155);
        let b1 = map(cos(angle), -1, 1, 20, 255);

        fill(r1 + 40, g1 + 40, b1 + 40);
        // fill(
        //     (125 + Math.abs(cos(angle) * 20)) * 4,
        //     (45 - y / 2 + sin(angle) * 60) * 8,
        //     (10 + (y / 3)) * 4
        // );
        // quad(x, 0, x2, 0, x2, y2, x, y);
        rect(x, 0, width / 20, height);

        let r2 = map(y, 0, height, 25, 100);
        let g2 = map(y, 0, height, 0, 255);
        let b2 = map(cos(angle), -1, 1, 20, 255);

        fill(r2 + 180, 0 + 180, b2 + 180);

        // fill((2 + y / 10) * 6,
        //     (2 + cos(angle) * 60 - oscX * 0.1) * 6,
        //     (2 + (y / 3) + cos(angle)) * 8
        // );
        quad(x, height, x2, height, x2, y2, x, y);

        // fill(255, 255, 255, 5);
        // rect(0, 0, width, height);
    }
    angle += speed;
}