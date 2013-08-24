"use strict";

var codetokeymap = {
	//general
	"3": ["cancel"],
	"8": ["backspace"],
	"9": ["tab"],
	"12": ["clear"],
	"13": ["enter"],
	"16": ["shift"],
	"17": ["ctrl"],
	"18": ["alt", "menu"],
	"19": ["pause", "break"],
	"20": ["capslock"],
	"27": ["escape", "esc"],
	"32": ["space", "spacebar"],
	"33": ["pageup"],
	"34": ["pagedown"],
	"35": ["end"],
	"36": ["home"],
	"37": ["left"],
	"38": ["up"],
	"39": ["right"],
	"40": ["down"],
	"41": ["select"],
	"42": ["printscreen"],
	"43": ["execute"],
	"44": ["snapshot"],
	"45": ["insert", "ins"],
	"46": ["delete", "del"],
	"47": ["help"],
	"91": ["command", "windows", "win", "super", "leftcommand", "leftwindows", "leftwin", "leftsuper"],
	"92": ["command", "windows", "win", "super", "rightcommand", "rightwindows", "rightwin", "rightsuper"],
	"145": ["scrolllock", "scroll"],
	"186": ["semicolon", ";"],
	"187": ["equal", "equalsign", "="],
	"188": ["comma", ","],
	"189": ["dash", "-"],
	"190": ["period", "."],
	"191": ["slash", "forwardslash", "/"],
	"192": ["graveaccent", "`"],
	"219": ["openbracket", "["],
	"220": ["backslash", "\\"],
	"221": ["closebracket", "]"],
	"222": ["apostrophe", "'"],

	//0-9
	"48": ["zero", "0"],
	"49": ["one", "1"],
	"50": ["two", "2"],
	"51": ["three", "3"],
	"52": ["four", "4"],
	"53": ["five", "5"],
	"54": ["six", "6"],
	"55": ["seven", "7"],
	"56": ["eight", "8"],
	"57": ["nine", "9"],

	//numpad
	"96": ["numzero", "num0"],
	"97": ["numone", "num1"],
	"98": ["numtwo", "num2"],
	"99": ["numthree", "num3"],
	"100": ["numfour", "num4"],
	"101": ["numfive", "num5"],
	"102": ["numsix", "num6"],
	"103": ["numseven", "num7"],
	"104": ["numeight", "num8"],
	"105": ["numnine", "num9"],
	"106": ["nummultiply", "num*"],
	"107": ["numadd", "num+"],
	"108": ["numenter"],
	"109": ["numsubtract", "num-"],
	"110": ["numdecimal", "num."],
	"111": ["numdevide", "num/"],
	"144": ["numlock", "num"],

	//function keys
	"112": ["f1"],
	"113": ["f2"],
	"114": ["f3"],
	"115": ["f4"],
	"116": ["f5"],
	"117": ["f6"],
	"118": ["f7"],
	"119": ["f8"],
	"120": ["f9"],
	"121": ["f10"],
	"122": ["f11"],
	"123": ["f12"]
};
//a-z and A-Z
for (var aI = 65; aI <= 90; aI += 1) {
	codetokeymap[aI] = String.fromCharCode(aI + 32);
}

var keytocodemap = {};
for(var code in codetokeymap){
    keytocodemap[codetokeymap[code]] = code;
}
