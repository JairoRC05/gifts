let canvas = document.getElementById("scratch");
let context = canvas.getContext("2d");
//initially mouse X and Y positions are 0
let mouseX = 0;
let mouseY = 0;
let isDragged = false;
// Events for touch and mouse
let events = {
	mouse: {
		down: "mousedown",
		move: "mousemove",
		up: "mouseup"
	},
	touch: {
		down: "touchstart",
		move: "touchmove",
		up: "touchend"
	}
};
let deviceType = "";
//Detect touch device
const is_touch_device = () => {
	try {
		//We try to create TouchEvent (it would fail for desktops and throw error)
		document.createEvent("TouchEvent");
		deviceType = "touch";
		return true;
	} catch (e) {
		deviceType = "mouse";
		return false;
	}
};

//initial setup
const init = () => {
	let gradientColor = context.createLinearGradient(0, 0, 135, 135);
	gradientColor.addColorStop(0, "#000");
	gradientColor.addColorStop(1, "#17013b");
	context.fillStyle = gradientColor;
	context.fillRect(0, 0, 200, 200);
};

//get left and top of canvas
let rectLeft = canvas.getBoundingClientRect().left;
let rectTop = canvas.getBoundingClientRect().top;

//exact x and y position of mouse/touch
const getXY = (e) => {
	mouseX = (!is_touch_device() ? e.pageX : e.touches[0].pageX) - rectLeft;
	mouseY = (!is_touch_device() ? e.pageY : e.touches[0].pageY) - rectTop;
};

const scratch = (x, y) => {
	// destination-out draws new shapes behind the existing canvas content.
	context.globalCompositeOperation = "destination-out";
	context.beginPath();
	//arc makes circle- x,y,radius,start angle, end angle
	context.arc(x, y, 12, 0, 2 * Math.PI);
	context.fill();
};

is_touch_device();
// start scratch
canvas.addEventListener(events[deviceType].down, (event) => {
	isDragged = true;
	//get x and y position
	getXY(event);
	scratch(mouseX, mouseY);
});

//mousemove/touchmove
canvas.addEventListener(events[deviceType].move, (event) => {
	if (!is_touch_device()) {
		event.preventDefault();
	}
	if (isDragged) {
		getXY(event);
		scratch(mouseX, mouseY);
	}
});

// stop drawing
canvas.addEventListener(events[deviceType].up, () => {
	isDragged = false;
});

// if mouse leaves the square
canvas.addEventListener("mouseleave", () => {
	isDragged = false;
});

window.onload = init();



function confettiFalling() {

	var box = document.getElementById("box");
	var colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'];

	for (var i = 0; i < 1000; i++) {
		
		// Create 1000 DIV elements for confetti
		var div = document.createElement("div");
		div.classList.add("confetti");
		box.appendChild(div);
	}

	var confetti = document.querySelectorAll('.confetti');

	for (var i = 0; i < confetti.length; i++) {
		
		var size = Math.random() * 0.01 * [i];

		confetti[i].style.width = 5 + size + 'px';
		confetti[i].style.height = 16 + size + 'px';
		confetti[i].style.left = Math.random() * innerWidth + 'px';

		var background = colors[Math.floor(Math.random() * colors.length)];
		confetti[i].style.backgroundColor = background;

		box.children[i].style.transform = "rotate("+ size*[i] +"deg)";
	}
}