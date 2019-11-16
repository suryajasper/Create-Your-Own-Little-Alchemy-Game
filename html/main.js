document.getElementById("newElement").addEventListener("click", function() { addNewElement(null, null); });
document.getElementById("newFormula").addEventListener("click", function() { addNewFormula(null, null, null); });
document.getElementById("download").addEventListener("click", Download_Data);

var loadFile = document.getElementById("load");
var parent = document.getElementById("parent");
var elementFields = [];
var formulaFields = [];
var formulaParent = document.getElementById("FormulaParent");

function addNewElement(name, imgSrc) {
  var fieldset = document.createElement("fieldset");

  var legend = document.createElement("legend");
  var legendNode = (name == null) ? document.createTextNode("Please enter a file") : document.createTextNode(name);
  legend.appendChild(legendNode);
  fieldset.appendChild(legend);

  var image = document.createElement("IMG");
  image.setAttribute("id", "display");
  let tempSrc = (imgSrc == null) ? "" : imgSrc;
  image.setAttribute("src", tempSrc);
  fieldset.appendChild(image);

  var input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("tag", "selectedFile");
  input.setAttribute("name", "mp4");
  input.setAttribute("multiple",true);
  input.onchange = function () {
    var reader = new FileReader();
    reader.onload = function (e) {
      image.src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
  };

  var textField = document.createElement("input");
  textField.setAttribute("type", "text");
  textField.value = (name == null) ? "" : name;
  textField.onchange = function () {
    legendNode.textContent = textField.value;
  }
  elementFields.push([textField, image]);

  var deleteButton = document.createElement("BUTTON");
  deleteButton.appendChild(document.createTextNode("Delete"));
  deleteButton.addEventListener("click", function () { fieldset.remove(); });

  fieldset.appendChild(input);
  fieldset.appendChild(textField);
  fieldset.appendChild(deleteButton);
  parent.appendChild(fieldset);
}
function addNewFormula(e1, e2, r) {
  var fieldset = document.createElement("fieldset");

  var legend = document.createElement("legend");
  var legendNode = document.createTextNode("Please create a formula");
  legend.appendChild(legendNode);
  fieldset.appendChild(legend);

  var element1 = document.createElement("input");
  element1.setAttribute("type", "text");
  var element2 = document.createElement("input");
  element2.setAttribute("type", "text");
  var result = document.createElement("input");
  result.setAttribute("type", "text");
  var changeValues = function () {
    legendNode.textContent = element1.value.concat(" + ", element2.value, " = ", result.value);
  }
  element1.onchange = changeValues;
  element2.onchange = changeValues;
  result.onchange = changeValues;
  if (e1 != null && e2 != null && r != null) {
    element1.value = e1;
    element2.value = e2;
    result.value = r;
    changeValues();
  }
  formulaFields.push([element1, element2, result]);
  var plus = document.createElement("p");
  plus.appendChild(document.createTextNode("  +  "));
  var equals = document.createElement("p");
  equals.appendChild(document.createTextNode("  =  "));

  var deleteButton = document.createElement("BUTTON");
  deleteButton.appendChild(document.createTextNode("Delete"));
  deleteButton.addEventListener("click", function () { fieldset.remove(); });

  fieldset.classList.add("my_div");

  fieldset.appendChild(element1);
  fieldset.appendChild(plus);
  fieldset.appendChild(element2);
  fieldset.appendChild(equals);
  fieldset.appendChild(result);
  fieldset.appendChild(deleteButton);
  formulaParent.appendChild(fieldset);
  $(".my_div p, .my_div input").css('display', 'inline-block');
}
function Download_Data() {
  var data = "element_div\n";
  for (var i = 0; i < elementFields.length; i++) {
    data += elementFields[i][0].value + "<" + elementFields[i][1].src + "\n";
  }
  data += "formula_div\n";
  for (var i = 0; i < formulaFields.length; i++) {
    data += formulaFields[i][0].value + "+" + formulaFields[i][1].value + "=" + formulaFields[i][2].value + "\n";
  }
  download("formulas_and_elements.txt", data);
}
function Load_Data() {
  var reader = new FileReader();
  reader.onload = function (e) {
    var rawresult = e.target.result;
    rawresult = rawresult.split("element_div\n")[1];
    var result = rawresult.split("formula_div\n");
    var elements = result[0].split("\n");
    var formulas = result[1].split("\n");

    for (var i = 0; i < elements.length-1; i++) {
      var splitElements = elements[i].split("<");
      addNewElement(splitElements[0], splitElements[1]);
    }
    for (var i = 0; i < formulas.length; i++) {
      var splitFormulas = formulas[i].split("+");
      addNewFormula(splitFormulas[0], splitFormulas[1].split("=")[0], splitFormulas[1].split("=")[1]);
    }
  };
  reader.readAsText(loadFile.files[0]);
}
function download(filename, text) {
	var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
