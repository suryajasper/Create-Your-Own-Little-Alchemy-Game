document.getElementById("newElement").addEventListener("click", addNewElement);
document.getElementById("newFormula").addEventListener("click", addNewFormula);
document.getElementById("download").addEventListener("click", download);
var parent = document.getElementById("parent");
var elements = {};
var formulas = [];
var formulaParent = document.getElementById("FormulaParent");

function addNewElement() {
  var fieldset = document.createElement("fieldset");

  var legend = document.createElement("legend");
  var legendNode = document.createTextNode("Please enter a file");
  legend.appendChild(legendNode);
  fieldset.appendChild(legend);

  var image = document.createElement("IMG");
  image.setAttribute("id", "display");
  image.setAttribute("src", "");
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
  textField.onchange = function () {
    legendNode.textContent = textField.value;
  }

  var deleteButton = document.createElement("BUTTON");
  deleteButton.appendChild(document.createTextNode("Delete"));
  deleteButton.addEventListener("click", function () { fieldset.remove(); });

  fieldset.appendChild(input);
  fieldset.appendChild(textField);
  fieldset.appendChild(deleteButton);
  parent.appendChild(fieldset);
}

function addNewFormula() {
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

  element1.onchange = function () {
    legendNode.textContent = element1.value.concat(" + ", element2.value, " = ", result.value);
  }
  element2.onchange = function () {
    legendNode.textContent = element1.value.concat(" + ", element2.value, " = ", result.value);
  }
  result.onchange = function () {
    legendNode.textContent = element1.value.concat(" + ", element2.value, " = ", result.value);
  }

  var plus = document.createElement("p");
  plus.appendChild(document.createTextNode("  +  "))
  var equals = document.createElement("p");
  equals.appendChild(document.createTextNode("  =  "))

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
function download() {

}
