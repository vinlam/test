function printPoint(point) {
    console.log("x = " + point.x + ", y = " + point.y);
}
function printName(x) {
    console.log("Hello, " + x.name);
}
var obj = {
    x: 0,
    y: 0,
    name: "Origin"
};
printPoint(obj);
printName(obj);
