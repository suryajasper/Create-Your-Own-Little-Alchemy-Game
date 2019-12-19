var imageIn = document.getElementById("load");
var completeButton = document.getElementById("completeButton");
var drawScaler = document.getElementById("drawingScale");
var grayScale = document.getElementById("grayScale");
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
      var r = Math.ceil(parseInt(image.getIntComponent0(x,y))/parseInt(drawScaler.value))*parseInt(drawScaler.value);
      var g = Math.ceil(parseInt(image.getIntComponent1(x,y))/parseInt(drawScaler.value))*parseInt(drawScaler.value);
      var b = Math.ceil(parseInt(image.getIntComponent2(x,y))/parseInt(drawScaler.value))*parseInt(drawScaler.value);
      if (grayScale.checked) {
        var gray = Math.floor(r * 0.21 + g * 0.72 + b * 0.07);
        image.setIntColor(x,y,255,gray,gray,gray);
      }
      else{
        image.setIntColor(x,y,255,r,g,b);
      }
    }
  }
  image.draw(canvas);
}
