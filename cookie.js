paper.install(window);

var isMouseDown = false;
var path;
var icing;

var vermiColors = ['#3FA9F5', '#7AC943', '#FF1D25', '#FF7BAC'];
var qty = 10;
var spread = 40;
var length = 10; 

function vermiColor () {
    var a = Math.floor(Math.random() * 3);
    return vermiColors[a];
}

function vermiAngle () {
    return Math.ceil(Math.random() * 360);
}

function vermicelle (x,y) {
    var myPoint = new Point (); 
    var mYPoint2 = new Point (); 
    var angle = vermiAngle();
    var rndx = Math.ceil(Math.random() * spread) - spread/2;
    var rndy = Math.ceil(Math.random() * spread) - spread/2;
    myPoint.x = x + rndx;
    myPoint.y = y + rndy;
    mYPoint2.x = myPoint.x + Math.cos(angle)*length;
    mYPoint2.y = myPoint.y + Math.sin(angle)*length;
    var vermi = new Path (); 
    vermi.add(myPoint); 
    vermi.add(mYPoint2);
    vermi.strokeColor = vermiColor();
    vermi.strokeWidth = 4;
}

function vermicelles (x,y) {
    for (var i = 0 ; i <= qty; i++) {
        vermicelle (x,y);
    }
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
    var pathMax = path.clone();
    pathMax.strokeWidth = 0;
    path.simplify(10);
    path.strokeColor = '#BB9C87';
    path.strokeWidth = 80;
    path.strokeCap = 'round';
    path.smooth();

    icing = path.clone();
    icing.strokeWidth = 10;
    for (var s in icing.segments) {
        var x = Math.random() * 20 - 10;
        var y = Math.random() * 20 - 10;
        icing.segments[s].point._x += x;
        icing.segments[s].point._y += y;
    }

    vermiYo = pathMax.clone();
    vermiYo.strokeWidth = 0;
    for (var s in vermiYo.segments) {
        vermicelles(vermiYo.segments[s].point.x,vermiYo.segments[s].point.y);
    }
}

/*************/
window.onload = function(e) {
    var canvas = document.getElementById('cookify');
    paper.setup(canvas);
    paper.view.draw();

}
