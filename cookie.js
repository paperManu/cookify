paper.install(window);

/*************/
// Parameters
var icingFuzziness = 20;

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
    path.strokeCap = 'round';
    var icing = path.clone();

    path.simplify(10);
    path.strokeColor = '#BB9C87';
    path.strokeWidth = 80;
    path.smooth();

    icing.simplify(5);
    icing.strokeWidth = 70;
    icing.strokeColor = '#EEEEEE';
    for (var s in icing.segments) {
        var x = Math.random() * icingFuzziness - icingFuzziness / 2;
        var y = Math.random() * icingFuzziness - icingFuzziness / 2;
        icing.segments[s].point.x += x;
        icing.segments[s].point.y += y;
    }

    var clipMask = path.clone();
    var clipGroup = new Group(clipMask, icing);
    clipGroup.clipped = true;
}

/*************/
window.onload = function(e) {
    var canvas = document.getElementById('cookify');
    paper.setup(canvas);
    paper.view.draw();
}
