paper.install(window);

var isMouseDown = false;
var path;
var vermiColors = ['#3FA9F5', '#7AC943', '#FF1D25', '#FF7BAC'];
var qty = 10;
var spread = 80;
var length = 10; 

function vermiColor () {
	var a = Math.ceil(Math.random() * 3);
	return vermiColors[a];
}

function vermiAngle () {
	return Math.ceil(Math.random() * 360);
}

function vermicelles (x,y) {
    var myPoint = new Point (); 
    var mYPoint2 = new Point (); 
    var angle = vermiAngle();
    var rnd = Math.ceil(Math.random() * spread) - spread/2;
    myPoint.x = x + rnd;
    myPoint.y = y + rnd;
    mYPoint2.x = myPoint.x + Math.cos(angle)*length;
    mYPoint2.y = myPoint.y + Math.sin(angle)*length;
    var vermi = new Path (); 
    vermi.add(myPoint); 
    vermi.add(mYPoint2);
    vermi.strokeColor = vermiColor();
    vermi.strokeWidth = 4;
}



/*************/
window.onmousedown = function(ev) {
    isMouseDown = true;
    if (path)
        path.selected = false;
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
    path.simplify(40);
    path.strokeColor = '#BB9C87';
    path.strokeWidth = 80;
    path.strokeCap = 'round';
    path.smooth();
}

/*************/
window.onload = function(e) {
    var canvas = document.getElementById('cookify');
    paper.setup(canvas);
    vermicelles(100,100);
    paper.view.draw();

}
