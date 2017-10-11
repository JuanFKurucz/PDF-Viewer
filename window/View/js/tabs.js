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

let $ = require('jquery');


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

function resizeTabs(){
  var tabDiv = document.getElementById("tabs");
  for(var d=0; d <tabDiv.getElementsByTagName("li").length; d++){
    tabDiv.getElementsByTagName("li")[d].style.width=(100/tabDiv.getElementsByTagName("li").length)+"%";
  }
}

function reizeNotes(){
  document.getElementById("notes").style.maxHeight=parseInt(document.getElementById("resumenForm").offsetTop-document.getElementById("notes").offsetTop-50)+"px";
}

$("#userNotes").bind('mouseup', function(){reizeNotes()});
$("#userNotes").bind('mousedown', reizeNotes);
$("#userNotes").bind('click', reizeNotes);

exports.addTab = function(appData,name){
  ipcRenderer.send('exportPDFtoJSON',appData+name);
  if(document.getElementById("resumenArea").style.display=="none"){
    document.getElementById("resumenArea").style.display="";
  }
  reizeNotes();
  if(checkTabs(name) == true){
    var webView = document.createElement("webview");
    webView.src=appData+name+".pdf";
    webView.setAttribute("plugins","true");
    webView.setAttribute("pdf",name);
    webView.setAttribute("preload","js/webview/script.js");
    webView.addEventListener("ipc-message", function (e) {
      if (webView.style.display!="none" && e.channel === "window-data") {
        saveInformation(e.args[0]);
      }
      cargarResumen(appData+name);
    })
    webView.style.height=window.innerHeight+"px";
    document.getElementsByClassName("col-sm-8")[0].appendChild(webView);

    var divTab = document.createElement("li");
    divTab.innerHTML="<a href='#'>"+name+"</a>";
    divTab.setAttribute("pdf",name);
    divTab.setAttribute("title",name);
    divTab.onclick=function(){
      hideExcept(this,appData);
    }
    document.getElementById("tabs").appendChild(divTab);
    resizeTabs();
  }
  hideExcept(document.querySelector('li[pdf="'+name+'"]'),appData);
}
window.addEventListener('resize', function(event) {
  var contenedor=document.getElementsByClassName("col-sm-8")[0].getElementsByTagName("webview");
  for(var w=0;w<contenedor.length;w++){
    contenedor[w].style.height=window.innerHeight+"px";
  }
  reizeNotes();
});
