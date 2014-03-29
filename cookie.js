paper.install(window);

<<<<<<< HEAD
var vermiColors = [#3FA9F5, #7AC943, #FF1D25, #FF7BAC];
var qty = 10;
var spread = 80;
var length = 10; 

var textItem = new PointText({
	content: 'Click and drag to draw a line.',
	point: new Point(20, 30),
	fillColor: 'black',
});

function vermiColor () {
	var a = Math.ceil(Math.random() * 3);
	return vermiColors[a];
}

function vermiAngle () {
	return Math.ceil(Math.random() * 360);
}

function vermicelles (x,y) {
	var a = 
}

function onMouseDown(event) {
	// If we produced a path before, deselect it:
	if (path) {
		path.selected = false;
	}
=======
var isMouseDown = false;
var path;

/*************/
window.onmousedown = function(ev) {
    isMouseDown = true;
    if (path)
        path.selected = false;
>>>>>>> FETCH_HEAD

    path = new Path();
    path.strokeColor = 'black';
    path.fullySelected = true;
}

/*************/
window.onmousemove = function(ev) {
    if (isMouseDown) {
        path.add(new Point(ev.clientX, ev.clientY));
    }
}

/*************/
// When the mouse is released, we simplify the path:
window.onmouseup = function(ev) {
    isMouseDown = false;
    path.selected = false;
    path.simplify(100);
    path.smooth();
}

/*************/
window.onload = function(e) {
    var canvas = document.getElementById('cookify');
    paper.setup(canvas);

    paper.view.draw();
}
