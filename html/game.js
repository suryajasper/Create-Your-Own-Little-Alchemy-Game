var elementsArr = [];
var formulasArr = [];
var loadFile = document.getElementById("load");
var canvas = null;
window.onload = function() {
  canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  width = canvas.width = window.innerWidth-20,
  height = canvas.height,
  handle = {
    x: width/2,
    y: height /2,
    radius: 20
  };
};
function load() {
  var reader = new FileReader();
  reader.onload = function (e) {
    var rawresult = e.target.result;
    rawresult = rawresult.split("element_div\n")[1];
    var result = rawresult.split("formula_div\n");
    var elements = result[0].split("\n");
    var formulas = result[1].split("\n");

    for (var i = 0; i < elements.length-1; i++) {
      var splitElements = elements[i].split("<");
      elementsArr.push([ splitElements[0], splitElements[1] ]);
    }
    for (var i = 0; i < formulas.length; i++) {
      var splitFormulas = formulas[i].split("+");
      formulasArr.push([splitFormulas[0], splitFormulas[1].split("=")[0], splitFormulas[1].split("=")[1]]);
      formulasArr.push([splitFormulas[1].split("=")[0], splitFormulas[0], splitFormulas[1].split("=")[1]]);
    }
    let img = loadImage(elementsArr[0][1]);
    canvas.drawImage(img, 0, 0);
  };
  reader.readAsText(loadFile.files[0]);
}

function loadImage(url) {
  return new Promise(r => {
    let i = new Image();
    i.onload = (() => r(i));
    i.src = url; 
  });
}
