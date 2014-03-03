"use strict";

// display
var FPS = 60;
var gridColumns = 16;
var gridRows = 10;
var worldWidth;
var worldHeight;

var canvasWidth;
var canvasHeight;

var stage;
var paused = false;

// game elements
var camera;
var jet;
var enemies = [];
var grid;

var particleEmitter;
var bulletEmitter;

var lastSpawnTime;
var timeBetweenSpawns = 0.5 * 1000;

var clockText;
var startTime;

function init() {
    //register key functions
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    stage = new createjs.Stage("canvas");
    worldWidth = 100 * gridColumns;
    worldHeight = 100 * gridRows;

    canvasHeight = window.stage.canvas.height;
    canvasWidth = window.stage.canvas.width;

    particleEmitter = new ParticleEmitter();
    bulletEmitter = new BulletEmitter();

    restart();

    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(FPS);
    createjs.Ticker.addEventListener("tick", tick);
}

function restart() {
    paused = true;

    stage.removeAllChildren();

    enemies.length = 0;
    bulletEmitter.particleCount = 0;

    leftStickX = 0;
    leftStickY = 0;
    rightStickX = 0;
    rightStickY = 0;
    lastSpawnTime = 0;

    clockText = new createjs.Text("0", "40px Arial", "#ff7700");
    clockText.textAlign = "center";
    clockText.x = canvasWidth / 2;
    clockText.y = 10;

    stage.addChild(clockText);
    createjs.Tween.get(clockText,{loop:true}).to({alpha:1},500,createjs.Ease.quadOut).to({alpha:0.2},500,createjs.Ease.quadIn);

    startTime = createjs.Ticker.getTime();

    jet = new Jet(worldWidth / 2, worldHeight / 2);
    stage.addChild(jet);

    camera = new Camera(jet);

    grid = new Grid();
    stage.addChild(grid);

    paused = false;
}

function tick(event) {
    pollInput();
    handleButtons();

    if (!paused) {
        // update game objects
        jet.tick(event);
        camera.tick(event);

        grid.tick(event);
        bulletEmitter.tick(event);

        updateEnemies(event);
        updateClock(event);
        particleEmitter.tick(event);

        // draw
        stage.update();
    }
}

function handleButtons() {
    if (button(8, PRESSED)) {
        restart();
    }
    if (button(9, PRESSED)) {
        pauseGame();
    }
    if (key("p", PRESSED)) {
        pauseGame();
    }
}

function updateEnemies(event) {
    // spawn enemies
    if (event.runTime - lastSpawnTime > timeBetweenSpawns) {
        spawnEnemy();
        lastSpawnTime = event.runTime;
    }

    // move enemies
    enemies.removeIf(function(enemy) {
        if (!enemy.tick(event)) {
            stage.removeChild(enemy);
            return true;
        }

        return false;
    });
}

function spawnEnemy(event) {
    var randomLocations = [[10, 10], [worldWidth - 10, worldHeight - 10], [10, worldHeight - 10], [worldWidth - 10, 10]];
    var location = randomLocations[getRandomInt(0, randomLocations.length - 1)]
    var randomEnemyType = getRandomInt(0, 2);
    var enemy;
    switch(randomEnemyType) {
        case 2: enemy = new Triangle(location[0], location[1]); break;
        case 1: enemy = new Square(location[0], location[1]); break;
        case 0: enemy = new Star(location[0], location[1]); break;
    }
    stage.addChild(enemy);
    enemies.push(enemy);
}

function updateClock(event) {
    var ms = event.runTime - startTime;
    var s = Math.floor(ms / 1000);
    var m = Math.floor(s / 60);
    var secondsHand = s % 60;
    clockText.text = ('0' + m).slice(-2) + ':' + ('0' + secondsHand).slice(-2);
}

function pauseGame() {
    paused = !paused;
}
