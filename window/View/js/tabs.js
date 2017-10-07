const {cargarResumen,saveInformation} = require(`${__dirname}/userNotes.js`);
const {ipcRenderer} = require('electron');
function checkTabs(name){
  var tabDiv = document.getElementById("tabs");
  for(var d=0; d <tabDiv.getElementsByTagName("li").length; d++){
    if(tabDiv.getElementsByTagName("li")[d].getAttribute("pdf")==name){
      return false;
    }
  }
  return true;
}

function activeTabs(name){
  var contenedor=document.getElementById("tabs").getElementsByTagName("li");
  for(var d=0;d<contenedor.length;d++){
    if(name!=contenedor[d]){
      contenedor[d].setAttribute("class","");
    } else {
      contenedor[d].setAttribute("class","active");
    }
  }
}

function hideExcept(name,appData){
  var contenedor=document.getElementsByClassName("col-sm-8")[0].getElementsByTagName("webview");
  for(var w=0;w<contenedor.length;w++){
    if(contenedor[w].getAttribute("pdf")!=name.getAttribute("pdf")){
      contenedor[w].style.display="none";
    } else {
      contenedor[w].style.display="";
      document.getElementById("saveUserNotes").setAttribute("pdfActive",contenedor[w].getAttribute("pdf"))
    }
  }
  activeTabs(name);
}

exports.addTab = function(appData,name){
  ipcRenderer.send('exportPDFtoJSON',appData+name);
  if(document.getElementById("resumenArea").style.display=="none"){
    document.getElementById("resumenArea").style.display="";
  }
  if(checkTabs(name) == true){
    var webView = document.createElement("webview");
    webView.src=appData+name;

    var newName=name.substring(0,name.length-4);

    webView.setAttribute("plugins","true");
    webView.setAttribute("pdf",newName);
    webView.setAttribute("preload","js/webview/script.js");
    webView.addEventListener("ipc-message", function (e) {
      if (webView.style.display!="none" && e.channel === "window-data") {
        saveInformation(e.args[0]);
      }
      cargarResumen(appData+newName);
    })
    webView.style.height=window.innerHeight+"px";
    document.getElementsByClassName("col-sm-8")[0].appendChild(webView);


    var divTab = document.createElement("li");
    divTab.innerHTML="<a href='#'>"+newName+"</a>";
    divTab.setAttribute("pdf",newName);
    divTab.onclick=function(){
      hideExcept(this,appData);
    }
    document.getElementById("tabs").appendChild(divTab);
  }
  hideExcept(document.querySelector('li[pdf="'+newName+'"]'),appData);
}
window.addEventListener('resize', function(event) {
  var contenedor=document.getElementsByClassName("col-sm-8")[0].getElementsByTagName("webview");
  for(var w=0;w<contenedor.length;w++){
    contenedor[w].style.height=window.innerHeight+"px";
  }
});
