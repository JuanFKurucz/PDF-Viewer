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
    writeSummary(appData+nombrePDF+'_Summary', resumen);
      console.log('Your notes has been saved');
  }
}

exports.cargarResumen = function(appData){
  var nombrePDF=pdfActive();
  console.log(nombrePDF);
  console.log(appData);
  fs.readFile(appData+nombrePDF+'_Summary.json',(err,data)=>{
    if(err) {
      writeSummary(appData+nombrePDF,'');
      // throw err;
    }else{
      getNumberPages(appData+nombrePDF,function(numeroTotalPaginas){
        var diccionario = JSON.parse(data);
        var paginaActual=parseInt(information.documentCurrentHeight/(information.documenttotalHeight/numeroTotalPaginas))
       document.getElementById('notes').innerHTML=beautifulNotes(diccionario[paginaActual]);
     })
    }
  })
  document.getElementById('userNotes').value='';

}

var information={'documenttotalHeight': 1, 'documentCurrentHeight':0 }


exports.saveInformation = function(info){
  information=info;
}

function loadSummary(path,callback){
  var ndata={};
  fs.readFile(path,(err,data)=>{
    if(err) {}else{
      ndata=JSON.parse(data);
    }
    callback(null,ndata)
  })
}

function writeToFile(path,text){
  console.log(text)
  fs.writeFile(path,text, (err)=>{
    if(err) throw err;
  })
}

function writeSummary(path,content){
  var diccionario={};
  console.log("writeSummary",path)
  if(content!=''){
    getNumberPages(path.replace("_Summary",""),function(e,numeroTotalPaginas){
      loadSummary(path+'.json',function(e,data){
        diccionario = data;
        var paginaActual=parseInt(information.documentCurrentHeight/(information.documenttotalHeight/numeroTotalPaginas))
        diccionario[paginaActual]=content;
        console.log(diccionario);
        writeToFile(path+'.json',JSON.stringify(diccionario));
      });
    });
  } else {
    writeToFile(path+'.json',JSON.stringify(diccionario));
  }

}
