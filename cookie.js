paper.install(window);

var isMouseDown = false;
var path;

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
    path.simplify(100);
    path.smooth();
}

/*************/
window.onload = function(e) {
    var canvas = document.getElementById('cookify');
    paper.setup(canvas);

    paper.view.draw();
}
