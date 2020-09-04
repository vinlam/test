interface Pointlike {
  x: number;
  y: number;
}
interface Named {
  name: string;
}

function printPoint(point: Pointlike) {
  console.log("x = " + point.x + ", y = " + point.y);
}

function printName(x: Named) {
  console.log("Hello, " + x.name);
}

const obj = {
  x: 0,
  y: 0,
  name: "Origin",
};

printPoint(obj);
printName(obj);