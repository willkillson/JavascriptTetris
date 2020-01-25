var key = undefined;
window.addEventListener('keypress', function (e) {
    key = e.key;
}, false);

var milliseconds = 0;
window.setInterval(function addseconds() {
    milliseconds++;
}, 1);