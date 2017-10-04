var fs = require('fs');
const {beautifulNotes} = require(__dirname+"/beautifulNotes.js");

function pdfActive(){
  var contenedor=document.getElementsByClassName("col-sm-8")[0].getElementsByTagName("webview");
  for(var w=0;w<contenedor.length;w++){
    if(contenedor[w].style.display!="none"){
      return contenedor[w].getAttribute("pdf").split(".")[0];
    }
  }
  return false;
}

exports.userNotes= (appData)=>{
  var resumen = document.getElementById('userNotes').value;
  var nombrePDF=pdfActive();
  console.log(document.getElementById('userNotes').value);
  if(nombrePDF != false){
    writeSummary(appData+nombrePDF+'.txt', resumen);
      console.log('Your notes has been saved');
  }
}

exports.cargarResumen = function(appData){
  var nombrePDF=pdfActive();
  console.log(nombrePDF);
  console.log(appData);
  fs.readFile(appData+nombrePDF+'.txt',(err,data)=>{
    if(err) {
      writeSummary(appData+nombrePDF+'.txt','');
      // throw err;
    }else{
     document.getElementById('notes').innerHTML=beautifulNotes(data);
    }
  })
  document.getElementById('userNotes').value='';
  
}
function writeSummary(path,content){
  fs.writeFile(path, content, (err)=>{
    if(err) throw err;
    console.log('Your notes has been saved');
  })
}
