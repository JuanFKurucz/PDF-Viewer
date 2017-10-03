const {cargarResumen} = require(`${__dirname}/userNotes.js`);

function checkTabs(name){
  var tabDiv = document.getElementById("tabs");
  for(var d=0; d <tabDiv.getElementsByTagName("div").length; d++){
    if(tabDiv.getElementsByTagName("div")[d].getAttribute("pdf")==name){
      return false;
    }
  }
  return true;
}

function activeTabs(name){
  var clicked_one=document.querySelector('div[pdf="'+name+'"]')
  var contenedor=document.getElementById("tabs").getElementsByTagName("div");
  for(var d=0;d<contenedor.length;d++){
    if(clicked_one!=contenedor[d]){
      contenedor[d].setAttribute("class","");
      contenedor[d].style="display:inline;font-weight:normal;"
    } else{
      contenedor[d].setAttribute("class","active");
      contenedor[d].style="display:inline;font-weight:bold;"
    }
  }
}

function hideExcept(name,appData){
  var contenedor=document.getElementsByClassName("col-sm-8")[0].getElementsByTagName("webview");
  for(var w=0;w<contenedor.length;w++){
    if(contenedor[w].getAttribute("pdf")!=name){
      contenedor[w].style.display="none";
    } else {
      contenedor[w].style.display="";
    }
  }
  activeTabs(name);
  cargarResumen(appData);
}

exports.addTab = function(appData,name){
  if(document.getElementById("resumenArea").style.display=="none"){
    document.getElementById("resumenArea").style.display="";
  }
  if(checkTabs(name) == true){
    var webView = document.createElement("webview");
    webView.src=appData+name;
    webView.setAttribute("plugins","true");
    webView.setAttribute("pdf",name);
    webView.style.height=window.innerHeight+"px";
    document.getElementsByClassName("col-sm-8")[0].appendChild(webView);
    var divTab = document.createElement("div");
    divTab.textContent="   "+name+"   ";
    divTab.style="display:inline;"
    divTab.setAttribute("pdf",name);
    divTab.onclick=function(){
      hideExcept(this.getAttribute("pdf"),appData);
    }
    document.getElementById("tabs").appendChild(divTab);
    hideExcept(name,appData);
  } else {
    hideExcept(name,appData);
  }
}
window.addEventListener('resize', function(event) {
  var contenedor=document.getElementsByClassName("col-sm-8")[0].getElementsByTagName("webview");
  for(var w=0;w<contenedor.length;w++){
    contenedor[w].style.height=window.innerHeight+"px";
  }
});
