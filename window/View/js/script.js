const {ipcRenderer} = require('electron');
var appData;

function addNewPdfItem(name){
  var newLi = document.createElement("li");
  newLi.textContent=name;
  newLi.onclick=function(){
    document.getElementById("pdf").src=appData+name;
  }
  newLi.style="cursor:pointer;"
  document.getElementById("pdfList").append(newLi);
}

function init(){
  ipcRenderer.on('path', (event, arg) => {
    appData=arg+"/Library/";
    document.getElementById("pdf").src=appData+"pdf.pdf";
  })
  ipcRenderer.send('loaded')
  window.addEventListener('resize', function(event) {
    document.getElementById("pdf").style.height=window.innerHeight+"px";
  });
  ipcRenderer.on('addPdfItems', (event, list) => {
    console.log(list);
    for(element in list){
      addNewPdfItem(list[element]);
    }
  })

  ipcRenderer.send('askPdfList')
}
