var imageIn = document.getElementById("load");
var completeButton = document.getElementById("completeButton");
var colorIn = {r: document.getElementById("R"), g: document.getElementById("G"), b: document.getElementById("B")};
var colorOut = {r: document.getElementById("Rto"), g: document.getElementById("Gto"), b: document.getElementById("Bto")};
var scaleIn = document.getElementById("scaleOfValues");
var canvas = document.getElementById("canvas");
var image = undefined;

imageIn.onchange = function() {
  image = new MarvinImage();

  var reader = new FileReader();
  reader.onload = function (e) {
    completeButton.addEventListener("click", function() {
      image.load( e.target.result, imageLoaded);
    });
  };
  reader.readAsDataURL(this.files[0]);
}
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
