"use strict";

var KEYCODE_ENTER = 13;
var KEYCODE_SPACE = 32;
var KEYCODE_UP = 38;
var KEYCODE_DOWN = 40;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_W = 87;
var KEYCODE_A = 65;
var KEYCODE_S = 83;
var KEYCODE_D = 68;

var KEYCODE_P = 80; // pause the game

var gamepad
var leftStickX;
var leftStickY;
var rightStickX;
var rightStickY;

var leftHeld;             //is the user holding a move left command
var rightHeld;            //is the user holding a move right command
var upHeld;               //is the user holding a move up command
var downHeld;             //is the user holding a move down command

var b0Held;

var shootUpHeld;
var shootDownHeld;
var shootLeftHeld;
var shootRightHeld;

function checkGamepad() {
    var gamepads = (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) || navigator.webkitGamepads;

    var debug = '';
    if (gamepads.length) {

        var pad;

        for (var i = 0; i < gamepads.length; i++) {
            if (gamepads[i]) {
                pad = gamepads[i];
                break;
            }
        }

        if (pad && pad.axes.length === 4 && pad.buttons.length > 1) {
            leftStickX = pad.axes[0];
            leftStickY = pad.axes[1];
            rightStickX = pad.axes[2];
            rightStickY = pad.axes[3];

            if (b0Held && !pad.buttons[0]) {
                window.restart();
            }

            b0Held = pad.buttons[0];
        } else {
            // resort to keyboard input
            leftStickX = 0;
            leftStickY = 0;
            rightStickX = 0;
            rightStickY = 0;

            if (upHeld) {
                leftStickY -= 1;
            }
            if (downHeld) {
                leftStickY += 1;
            }
            if (leftHeld) {
                leftStickX -= 1;
            }
            if (rightHeld) {
                leftStickX += 1;
            }

            if (shootUpHeld) {
                rightStickY -= 1;
            }
            if (shootDownHeld) {
                rightStickY += 1;
            }
            if (shootLeftHeld) {
                rightStickX -= 1;
            }
            if (shootRightHeld) {
                rightStickX += 1;
            }
        }

        debug = 'LeftStick (' + leftStickX + ", " + leftStickY + ")<br/>";
        debug += 'RightStick (' + rightStickX + ", " + rightStickY + ")<br/>";

        document.getElementById("debug").innerHTML = debug;
    }
}

//allow for WASD and arrow control scheme
function handleKeyDown(e) {
    //cross browser issues exist
    if(!e){ var e = window.event; }
    switch(e.keyCode) {
        case KEYCODE_W:     upHeld = true; return false;
        case KEYCODE_A:     leftHeld = true; return false;
        case KEYCODE_S:     downHeld = true; return false;
        case KEYCODE_D:     rightHeld = true; return false;
        case KEYCODE_UP:    shootUpHeld = true; return false;
        case KEYCODE_DOWN:  shootDownHeld = true; return false;
        case KEYCODE_LEFT:  shootLeftHeld = true; return false;
        case KEYCODE_RIGHT: shootRightHeld = true; return false;
        case KEYCODE_P: pauseGame(); return false;
    }
}

function handleKeyUp(e) {
    //cross browser issues exist
    if(!e){ var e = window.event; }
    switch(e.keyCode) {
        case KEYCODE_W:     upHeld = false; break;
        case KEYCODE_A:     leftHeld = false; break;
        case KEYCODE_S:     downHeld = false; break;
        case KEYCODE_D:     rightHeld = false; break;
        case KEYCODE_UP:    shootUpHeld = false; break;
        case KEYCODE_DOWN:  shootDownHeld = false; break;
        case KEYCODE_LEFT:  shootLeftHeld = false; break;
        case KEYCODE_RIGHT: shootRightHeld = false; break;
    }
}
