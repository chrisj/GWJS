"use strict";

var INACTIVE = 0;
var HELD = 1;
var PRESSED = 2;
var RELEASED = 3;

var leftStickX;
var leftStickY;
var rightStickX;
var rightStickY;

var prev_buttons;
var buttons_state = [];

var pressed_keys;
var held_keys;
var pressed_keys_buffer = [];
var held_keys_buffer = [];

function checkGamepad() {
    var gamepads = (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) || navigator.webkitGamepads;

    var debug = '<pre>';
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

            if(prev_buttons) {
                var button_count = pad.buttons.length;

                for(var i = 0; i < button_count; i++) {
                    var previous = prev_buttons[i];
                    var current = pad.buttons[i];

                    if(!previous && !current) {
                        buttons_state[i] = INACTIVE;
                    } else if(previous && current) {
                        buttons_state[i] = HELD;
                    } else if (!previous && current) {
                        buttons_state[i] = PRESSED;
                    } else {
                        buttons_state[i] = RELEASED;
                    }
                }
            }
            prev_buttons = pad.buttons;

            debug += 'Gamepads id:' + pad.id + "<br/>";
            debug += 'Buttons (' + buttons_state  + ")<br/>";

        } else {
            checkKeyboard();
            debug += 'NO GAMEPAD' + "<br/>";
        }

        debug += 'LeftStick           (' + leftStickX + ", " + leftStickY + ")<br/>";
        debug += 'RightStick          (' + rightStickX + ", " + rightStickY + ")<br/>";
        debug += 'Pressed Keys        (' + pressed_keys + ")<br/>";
        debug += 'Pressed Keys Buffer (' + pressed_keys_buffer + ")<br/>";
        debug += 'Held Keys           (' + held_keys + ")<br/>";
        debug += 'Held Keys Buffer    (' + held_keys_buffer + ")<br/>";

        debug += '</pre';
        document.getElementById("debug").innerHTML = debug;
    }
}

function checkKeyboard() {
    leftStickX = 0;
    leftStickY = 0;
    rightStickX = 0;
    rightStickY = 0;

    if (key("w", HELD)) {
        leftStickY -= 1;
    }
    if (key("s", HELD)) {
        leftStickY += 1;
    }
    if (key("a", HELD)) {
        leftStickX -= 1;
    }
    if (key("d", HELD)) {
        leftStickX += 1;
    }

    if (key("up", HELD)) {
        rightStickY -= 1;
    }
    if (key("down", HELD)) {
        rightStickY += 1;
    }
    if (key("left", HELD)) {
        rightStickX -= 1;
    }
    if (key("right", HELD)) {
        rightStickX += 1;
    }
}

function handleKeyDown(e) {
    if(!e){ var e = window.event; }

    switch(e.keyCode) {
        case 37: case 39: case 38:  case 40: // Arrow keys
        case 32: e.preventDefault(); break; // Space
        default: break; // do not block other keys
    }

    var key_name = codetokeymap[e.keyCode];
    if (!held_keys_buffer.contains(key_name)) {
        pressed_keys_buffer.push(key_name);
        held_keys_buffer.push(key_name);
    }
}

function handleKeyUp(e) {
    if(!e){ var e = window.event; }
    held_keys_buffer.removeItem(codetokeymap[e.keyCode]);
}

function button(n, state) {
    return buttons_state[n] === state;
}

function key(key_name, state) {
    if (state === PRESSED) {
        return pressed_keys.contains(key_name);
    } else if (state === HELD) {
        return held_keys.contains(key_name);
    }
    return false;
}
