var path;

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

	// Create a new path and set its stroke color to black:
	path = new Path({
		segments: [event.point],
		strokeColor: 'black',
		// Select the path, so we can see its segment points:
		fullySelected: true
	});
}

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
function onMouseDrag(event) {
	path.add(event.point);

	// Update the content of the text item to show how many
	// segments it has:
	textItem.content = 'Segment count: ' + path.segments.length;
}

// When the mouse is released, we simplify the path:
function onMouseUp(event) {
	var segmentCount = path.segments.length;

	// When the mouse is released, simplify it:
	path.simplify(100);
	path.strokeColor = '#BB9C87';
	path.strokeWidth = 80;
	path.strokeCap = 'round';

	// Select the path, so we can see its segments:
	// path.fullySelected = true;

	var newSegmentCount = path.segments.length;
	var difference = segmentCount - newSegmentCount;
	var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
	textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';
}