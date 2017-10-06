var fs = require('fs');
const {beautifulNotes} = require(__dirname+"/beautifulNotes.js");
const {getNumberPages} = require(__dirname+"/readPDF.js");

exports.userNotes= (appData,name)=>{
  var resumen = document.getElementById('userNotes').value;
  writeSummary(appData+name+'_Summary', resumen);
}


var information={'documenttotalHeight': 1, 'documentCurrentHeight':0 }


exports.cargarResumen = function(path){
  fs.readFile(path+'_Summary.json',(err,data)=>{
    if(err) {
      writeSummary(path,'');
    }else{
      getNumberPages(path,function(err,numeroTotalPaginas){
        var diccionario = JSON.parse(data);
        var paginaActual=parseInt(information.documentCurrentHeight/(information.documenttotalHeight/numeroTotalPaginas))
       document.getElementById('notes').innerHTML=beautifulNotes(diccionario[paginaActual]);
    })
    }
  })
  document.getElementById('userNotes').value='';

}


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
  ////console.log(text)
  fs.writeFile(path,text, (err)=>{
    if(err) throw err;
  })
}

function writeSummary(path,content){
  var diccionario={};
  ////console.log("writeSummary",path)
  if(content!=''){
    getNumberPages(path.replace("_Summary",""),function(e,numeroTotalPaginas){
      loadSummary(path+'.json',function(e,data){
        diccionario = data;
        var paginaActual=parseInt(information.documentCurrentHeight/(information.documenttotalHeight/numeroTotalPaginas))
        diccionario[paginaActual]=content;
        ////console.log(diccionario);
        writeToFile(path+'.json',JSON.stringify(diccionario));
      });
    });
  } else {
    writeToFile(path+'.json',JSON.stringify(diccionario));
  }

}
