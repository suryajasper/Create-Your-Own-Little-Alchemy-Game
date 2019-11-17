function openView(elementName, formulas) {
  window.open("viewAll.html","Formulas of " + elementName,'height=200,width=150');
  document.getElementById("title").innerHTML = "All Formulas Of " + elementName;
}
