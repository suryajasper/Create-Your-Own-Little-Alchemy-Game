var imageIn = document.getElementById("load");
var completeButton = document.getElementById("completeButton");
var scaleIn = document.getElementById("scaleOfValues");
var canvas = document.getElementById("canvas");
var colorIn = {r: document.getElementById("R"), g: document.getElementById("G"), b: document.getElementById("B")};
var colorOut = {r: document.getElementById("Rto"), g: document.getElementById("Gto"), b: document.getElementById("Bto")};
var image = undefined;
var colorInVis = document.getElementById("colorIn");
var colorOutVis = document.getElementById("colorOut");

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

for (var key in colorIn) {
  colorIn[key].onchange = function() { colorInVis.value = rgbToHex(colorIn.r.value, colorIn.g.value, colorIn.b.value); };
}
for (var key in colorOut) {
  colorOut[key].onchange = function() { colorOutVis.value = rgbToHex(colorOut.r.value, colorOut.g.value, colorOut.b.value); };
}

colorInVis.addEventListener("input",  function() { changeColor(colorInVis, colorIn); });
colorOutVis.addEventListener("input",  function() { changeColor(colorOutVis, colorOut); });

function changeColor(data, out) {
  let newColor = hexToRgb(data.value);
  console.log();
  out.r.value = newColor.r;
  out.g.value = newColor.g;
  out.b.value = newColor.b;
}

imageIn.onchange = function() {
  image = new MarvinImage();
  var reader = new FileReader();
  reader.onload = function (e) {
    completeButton.addEventListener("click", function() {
      image.load( e.target.result, imageLoaded);
    });
  };
  reader.readAsDataURL(this.files[0]);
};

function imageLoaded() {
  canvas.width = image.getWidth();
  canvas.height = image.getHeight();

  for(var y=0; y<image.getHeight(); y++){
    for(var x=0; x<image.getWidth(); x++){
      var r = image.getIntComponent0(x,y);
      var g = image.getIntComponent1(x,y);
      var b = image.getIntComponent2(x,y);
      if (Math.abs(r-parseInt(colorIn.r.value)) < parseInt(scaleIn.value)
      && Math.abs(g-parseInt(colorIn.g.value)) < parseInt(scaleIn.value)
      && Math.abs(b-parseInt(colorIn.b.value)) < parseInt(scaleIn.value)) {
        console.log("hi");
        image.setIntColor(x,y,255,colorOut.r.value,colorOut.g.value,colorOut.b.value);
      }
    }
  }

  image.draw(canvas);
}
