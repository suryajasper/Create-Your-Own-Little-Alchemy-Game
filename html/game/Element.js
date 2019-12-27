class Element {
  show() {
    //background(60);
  rect(this.x, this.y, this.size/2, this.size/2);
    /*
    console.log('-----------------------------------------');
    console.log('x' + this.x.toString());
    console.log('y' + this.y.toString());
    console.log('size' + this.size.toString());
    console.log('topLeftx' + this.topLeft.x.toString());
    console.log('topLefty' + this.topLeft.y.toString());
    console.log('bottomRightx' + this.bottomRight.x.toString());
    console.log('bottomRighty' + this.bottomRight.y.toString());
    console.log('centerx' + this.center.x.toString());
    console.log('centery' + this.center.y.toString());
    */
  }
  constructor(imageSrc, x1, y1, size) {
    this.image = imageSrc;
    this.x = x1;
    this.y = y1;
    this.topLeft = {x: x1-size/2, y: y1-size/2};
    this.bottomRight = {x: x1+size/2, y: y1+size/2};
    this.center = {x: (this.bottomRight.x+this.topLeft.x)/2, y: (this.bottomRight.y-this.topLeft.y)/2};
    this.size = size;
    this.size = size;
    this.show();
  }
  move(xPos, yPos) {
    this.x += xPos;
    this.y += yPos;
    this.topLeft = {x: this.x-this.size/2, y: this.y-this.size/2};
    this.bottomRight = {x: this.x+this.size/2, y: this.y+this.size/2};
    this.center = {x: (this.bottomRight.x+this.topLeft.x)/2, y: (this.bottomRight.y-this.topLeft.y)/2};
    this.show();
  }
  moveTo(xPos, yPos) {
    this.x = xPos-this.size/4;
    this.y = yPos-this.size/4;
    this.topLeft = {x: this.x-this.size/2, y: this.y-this.size/2};
    this.bottomRight = {x: this.x+this.size/2, y: this.y+this.size/2};
    this.center = {x: (this.bottomRight.x+this.topLeft.x)/2, y: (this.bottomRight.y-this.topLeft.y)/2};
    this.show();
  }
  inside(xPos, yPos) {
    return (xPos > this.topLeft.x && xPos < this.bottomRight.x && yPos > this.topLeft.y && yPos < this.bottomRight.y);
  }
}
