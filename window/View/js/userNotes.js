var fs = require('fs');
const {beautifulNotes} = require(__dirname+"/beautifulNotes.js");
const {getNumberPages} = require(__dirname+"/readPDF.js");


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
    writeSummary(appData+nombrePDF+'_Summary.json', resumen);
      console.log('Your notes has been saved');
  }
}

exports.cargarResumen = function(appData){
  var nombrePDF=pdfActive();
  console.log(nombrePDF);
  console.log(appData);
  fs.readFile(appData+nombrePDF+'_Summary.json',(err,data)=>{
    if(err) {
      writeSummary(appData+nombrePDF+'_Summary.json','');
      // throw err;
    }else{
      var numeroTotalPaginas=getNumberPages(appData+nombrePDF);
      var diccionario = JSON.parse(data);
      var paginaActual=parseInt(information.documentCurrentHeight/(information.documenttotalHeight/numeroTotalPaginas))
     document.getElementById('notes').innerHTML=beautifulNotes(diccionario[paginaActual]);
    }
  })
  document.getElementById('userNotes').value='';

}

var information={'documenttotalHeight': 1, 'documentCurrentHeight':0 }


exports.saveInformation = function(info){
  information=info;
}

function loadSummary(path){
fs.readFile(path+'_Summary.json',(err,data)=>{
  if(err) {
    return {};
  }else{
   return data;
  }
})
}
function writeSummary(path,content){
  var numeroTotalPaginas=getNumberPages(path);
  var diccionario = JSON.parse(loadSummary(path));
  var paginaActual=parseInt(information.documentCurrentHeight/(information.documenttotalHeight/numeroTotalPaginas))
  diccionario[paginaActual]=data;
  fs.writeFile(path, JSON.stringify(content), (err)=>{
    if(err) throw err;
    console.log('Your notes has been saved');
  })
}
