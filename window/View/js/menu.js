const {addTab} = require(__dirname+"/tabs.js");

exports.addNewPdfItem = function(appData,name){
  var newLi = document.createElement("li");
  newLi.textContent=name;
  newLi.onclick=function(){
    addTab(appData,name);
  }
  newLi.style="cursor:pointer;"
  document.getElementById("pdfList").append(newLi);
}
