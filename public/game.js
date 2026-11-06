const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let gameState = "title";
let level = 1;
let score = 0;
let health = 100;
let boost = 100;
let roadDistance = 0;
let lastTime = 0;
let levelTimer = 0;

const keys = {};

const player = {
    x: WIDTH / 2,
    y: HEIGHT - 100,
    width: 34,
    height: 58,
    speed: 260
};

let enemies = [];
let energyCells = [];

document.addEventListener("keydown", function(event) {
    keys[event.key] = true;

    if (event.key === "Enter" && gameState === "title") {
        startGame();
    }

    if (event.key.toLowerCase() === "p") {
        if (gameState === "racing") {
            gameState = "paused";
        } else if (gameState === "paused") {
            gameState = "racing";
        }
    }

    if (event.key.toLowerCase() === "r" &&
        (gameState === "gameOver" || gameState === "victory")) {
        startGame();
    }

    if (event.key === "Enter" && gameState === "levelClear") {
        level++;
        levelTimer = 0;
        enemies = [];
        energyCells = [];
        gameState = "racing";
    }

    if (["ArrowLeft", "ArrowRight", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
    }
});

document.addEventListener("keyup", function(event) {
    keys[event.key] = false;
});

function startGame() {
    gameState = "racing";
    level = 1;
    score = 0;
    health = 100;
    boost = 100;
    roadDistance = 0;
    levelTimer = 0;
    enemies = [];
    energyCells = [];
    player.x = WIDTH / 2;

    for (let i = 0; i < 4; i++) {
        createEnemy(-100 - i * 150);
    }

    for (let i = 0; i < 3; i++) {
        createEnergyCell(-200 - i * 180);
    }
}

function createEnemy(yPosition) {
    const roadLeft = 230;
    const roadWidth = 440;

    enemies.push({
        x: roadLeft + 35 + Math.random() * (roadWidth - 70),
        y: yPosition,
        width: 34,
        height: 58,
        speed: 80 + Math.random() * 100,
        color: Math.random() > 0.5 ? "#ff3d81" : "#ffc857"
    });
}

function createEnergyCell(yPosition) {
    energyCells.push({
        x: 250 + Math.random() * 400,
        y: yPosition,
        size: 16
    });
}

function update(deltaTime) {
    if (gameState !== "racing") {
        return;
    }

    levelTimer += deltaTime;

    let currentSpeed = 220 + level * 45;
    const usingBoost = keys["ArrowUp"] && boost > 0;

    if (usingBoost) {
        currentSpeed += 130;
        boost -= 35 * deltaTime;
    } else {
        boost += 12 * deltaTime;
    }

    boost = clamp(boost, 0, 100);

    if (keys["ArrowLeft"]) {
        player.x -= player.speed * deltaTime;
    }

    if (keys["ArrowRight"]) {
        player.x += player.speed * deltaTime;
    }

    player.x = clamp(player.x, 250, 650);

    roadDistance += currentSpeed * deltaTime;
    score += Math.floor(currentSpeed * deltaTime * 0.08);

    for (let enemy of enemies) {
        enemy.y += (currentSpeed - enemy.speed) * deltaTime;
    }

    for (let cell of energyCells) {
        cell.y += currentSpeed * deltaTime;
    }

    checkEnemyCollisions();
    checkEnergyCollisions();

    enemies = enemies.filter(enemy => enemy.y < HEIGHT + 100);
    energyCells = energyCells.filter(cell => cell.y < HEIGHT + 50);

    if (enemies.length < 4 + level) {
        createEnemy(-80);
    }

    if (energyCells.length < 3) {
        createEnergyCell(-100);
    }

    if (levelTimer >= 20) {
        if (level < 3) {
            gameState = "levelClear";
        } else {
            gameState = "victory";
        }
    }

    if (health <= 0) {
        gameState = "gameOver";
    }
}

function checkEnemyCollisions() {
    for (let enemy of enemies) {
        if (isColliding(player, enemy)) {
            health -= 25;
            score = Math.max(0, score - 100);
            enemy.y = HEIGHT + 200;
        }
    }
}

function checkEnergyCollisions() {
    energyCells = energyCells.filter(cell => {
        const touching =
            Math.abs(player.x - cell.x) < 35 &&
            Math.abs(player.y - cell.y) < 45;

        if (touching) {
            score += 150;
            boost = Math.min(100, boost + 30);
            return false;
        }

        return true;
    });
}

function isColliding(first, second) {
    return (
        first.x - first.width / 2 < second.x + second.width / 2 &&
        first.x + first.width / 2 > second.x - second.width / 2 &&
        first.y - first.height / 2 < second.y + second.height / 2 &&
        first.y + first.height / 2 > second.y - second.height / 2
    );
}

function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
}

function draw() {
    drawBackground();
    drawRoad();

    if (gameState !== "title") {
        for (let enemy of enemies) {
            drawCar(enemy.x, enemy.y, enemy.color);
        }

        for (let cell of energyCells) {
            drawEnergyCell(cell);
        }

        drawCar(player.x, player.y, "#35f2e2");
        drawHud();
    }

    if (gameState === "title") {
        drawMessage("NEON DRIFT", "PRESS ENTER TO START");
    }

    if (gameState === "paused") {
        drawMessage("PAUSED", "PRESS P TO CONTINUE");
    }

    if (gameState === "levelClear") {
        drawMessage("SECTOR CLEAR", "PRESS ENTER FOR NEXT LEVEL");
    }

    if (gameState === "gameOver") {
        drawMessage("GAME OVER", "PRESS R TO RESTART");
    }

    if (gameState === "victory") {
        drawMessage("YOU WIN!", "PRESS R TO RACE AGAIN");
    }
}

function drawBackground() {
    ctx.fillStyle = "#11152d";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "#202653";

    for (let x = 0; x < WIDTH; x += 45) {
        const buildingHeight = 50 + (x * 17) % 100;
        ctx.fillRect(x, 180 - buildingHeight, 32, buildingHeight);
    }
}

function drawRoad() {
    ctx.fillStyle = "#ff3d81";
    ctx.fillRect(210, 0, 18, HEIGHT);
    ctx.fillRect(672, 0, 18, HEIGHT);

    ctx.fillStyle = "#252944";
    ctx.fillRect(228, 0, 444, HEIGHT);

    ctx.fillStyle = "#ffe7a8";

    for (let y = -40; y < HEIGHT; y += 80) {
        const roadLineY = (y + roadDistance) % 80;
        ctx.fillRect(WIDTH / 2 - 5, roadLineY, 10, 40);
    }
}

function drawCar(x, y, color) {
    ctx.fillStyle = "#080b16";
    ctx.fillRect(x - 21, y - 31, 42, 62);

    ctx.fillStyle = color;
    ctx.fillRect(x - 15, y - 27, 30, 54);

    ctx.fillStyle = "#1d2452";
    ctx.fillRect(x - 10, y - 14, 20, 14);

    ctx.fillStyle = "#ffe7a8";
    ctx.fillRect(x - 8, y - 24, 16, 5);

    ctx.fillStyle = "#ff3d81";
    ctx.fillRect(x - 8, y + 20, 16, 5);
}

function drawEnergyCell(cell) {
    ctx.save();
    ctx.translate(cell.x, cell.y);
    ctx.rotate(Math.PI / 4);

    ctx.fillStyle = "#35f2e2";
    ctx.fillRect(-8, -8, 16, 16);

    ctx.restore();
}

function drawHud() {
    ctx.fillStyle = "#ffe7a8";
    ctx.font = "22px Arial";

    ctx.fillText("LEVEL: " + level, 25, 35);
    ctx.fillText("SCORE: " + score, 25, 65);

    ctx.fillText("HEALTH", 700, 35);
    ctx.fillStyle = "#333";
    ctx.fillRect(700, 45, 160, 15);

    ctx.fillStyle = health > 40 ? "#35f2e2" : "#ff3d81";
    ctx.fillRect(700, 45, health * 1.6, 15);

    ctx.fillStyle = "#ffe7a8";
    ctx.fillText("BOOST", 700, 90);

    ctx.fillStyle = "#333";
    ctx.fillRect(700, 100, 160, 15);

    ctx.fillStyle = "#7f61ff";
    ctx.fillRect(700, 100, boost * 1.6, 15);
}

function drawMessage(title, subtitle) {
    ctx.fillStyle = "rgba(5, 6, 15, 0.85)";
    ctx.fillRect(120, 170, 660, 250);

    ctx.textAlign = "center";

    ctx.fillStyle = "#35f2e2";
    ctx.font = "48px Arial";
    ctx.fillText(title, WIDTH / 2, 270);

    ctx.fillStyle = "#ffe7a8";
    ctx.font = "24px Arial";
    ctx.fillText(subtitle, WIDTH / 2, 330);

    ctx.textAlign = "left";
}

function gameLoop(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    update(Math.min(deltaTime, 0.05));
    draw();

    requestAnimationFrame(gameLoop);
}

draw();
requestAnimationFrame(gameLoop);