var elements = [];
var follow = -1;
var size = 150;

function clearC() {
  background(60);
}
function setup() {
  createCanvas(900, 700);
  clearC();
}
function draw() {
  clearC();
  for (var element of elements) {
    element.show();
  }
  if (follow != -1) {
    console.log('wef89e2');
    elements[follow].moveTo(mouseX, mouseY);
  }
}

function keyPressed() {
  switch (key) {
    case ' ':
      elements.push(new Element("5", 100, 100, size));
  }
}

function mousePressed() {
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].inside(mouseX, mouseY)) {
      if (follow == -1) {
        elements[i].size *= 1.2;
        follow = i;
      }
    }
  }
}
function mouseReleased() {
  if (follow != -1) {
    elements[follow].size = size;
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].inside(elements[follow].center.x, elements[follow].center.y)) {
        elements.splice(i, i);
      }
    }
    follow = -1;
  }
}
