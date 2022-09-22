let cubes = []; //创建方块数列；
// let cube;

function setup() {
  createCanvas(600, 400);
  rectMode(CENTER);
  angleMode(DEGREES);

  //   cubes[i] = new Cube(x, y, 1, d);
}

//拖拽画出线条；
function mouseDragged() {
  let r = 30;
  let c = new Cube(mouseX, mouseY, 1, r);
  cubes.push(c);
}

//漂浮在方块上边框变粗；
function draw() {
  background(0);
  for (let i = 0; i < cubes.length; i++) {
    if (cubes[i].dele(mouseX, mouseY)) {

      cubes[i].changeThick(5);
    } else {

      cubes[i].changeThick(1);

    }
    cubes[i].move();
    cubes[i].show();
  }
  if (cubes.length > 30) { //设置方块数量上限为15；
    cubes.splice(0, 1);
  }
}

//双击删除方块；
function doubleClicked() {
  for (let i = cubes.length - 1; i >= 0; i--) {
    if (cubes[i].dele(mouseX, mouseY)) {
      cubes.splice(i, 1);
      console.log("DELETE CUBE!");
    }
  }
}


//创建数据库为function所用；
class Cube {

  //创建变量：x；y；角度；半径；灰度；边框厚度；
  constructor(x, y, a, r) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.r = r;
    this.pgray = 0;
    this.sthick = 0;
  }

  //（单击用）为鼠标设置范围 方块内为真 方块外为假；
  clicked(px, py) {
    let dx1 = dist(px, 0, this.x, 0);
    let dy1 = dist(0, py, 0, this.y);
    if (dx1 < this.r / 2 && dy1 < this.r / 2) {
      // this.pgray = 200;
      return true;
      // console.log("CLICKED ON CUBE!");
      // console.log("DELETE CUBE!");
    } else {
      return false;
    }
  }

  // float(fx, fy) {
  //   let dx3 = dist(fx, 0, this.x, 0);
  //   let dy3 = dist(0, fy, 0, this.y);
  //   if (dx3 < this.r / 2 && dy3 < this.r / 2) {
  //     this.sthick = 5;
  //     console.log("FLOAT ON CUBE!");
  //   } else {
  //     this.sthick = 1;
  //   }
  // }

  //方块灰度数值；
  changeGray(grayw) {
    this.pgray = grayw;
  }

  //方块边框数值；
  changeThick(thickw) {
    this.sthick = thickw;
  }

  //（双击用）为鼠标设置范围 方块内为真 方块外为假；
  dele(hx, hy) {
    // translate(this.x, this.y);
    let dx2 = dist(hx, 0, this.x, 0);
    let dy2 = dist(0, hy, 0, this.y);
    if (dx2 < this.r / 2 && dy2 < this.r / 2) {
      return true;
      // console.log("DELETE CUBE!");
    } else {
      return false;
    }
  }

  //方块随机移动 & 随机大小；
  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
    this.a = this.a + 1;
  }

  //让方块旋转；
  show() {
    stroke(255);
    strokeWeight(this.sthick);
    fill(this.pgray, 100);
    push();
    translate(this.x, this.y);

    rotate(this.a);
    rect(0, 0, this.r);
    pop();
  }
}
