var fs = require('fs');
const {beautifulNotes} = require(__dirname+"/beautifulNotes.js");
const {getNumberPages} = require(__dirname+"/readPDF.js");
var information={'documenttotalHeight': 1, 'documentCurrentHeight':0 }

function writeToFile(path,text){
  fs.writeFile(path,text,(err)=>{
    if(err) throw err;
  })
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

function writeSummary(path,content){
  var diccionario={};
  if(content!=''){
    getNumberPages(path.replace("_Summary",""),function(e,numeroTotalPaginas){
      loadSummary(path+'.json',function(e,data){
        //console.log(path);
        diccionario = data;
        var paginaActual=parseInt(information.documentCurrentHeight/(information.documenttotalHeight/numeroTotalPaginas))
        diccionario[paginaActual]=content;
        writeToFile(path+'.json',JSON.stringify(diccionario));
        cargar_resumen(path.replace("_Summary",""));
      });
    });
  }
}


function cargar_resumen(path){
  //console.log(path+'_Summary.json')
  fs.readFile(path+'_Summary.json',(err,data)=>{
    if (err) {
      writeSummary(path,'');
    } else {
      var diccionario = JSON.parse(data);
      getNumberPages(path,function(err,numeroTotalPaginas){
        var paginaActual = parseInt(information.documentCurrentHeight/(information.documenttotalHeight/numeroTotalPaginas))
        document.getElementById('notes').innerHTML = beautifulNotes(diccionario[paginaActual]);
        document.getElementById('userNotes').value='';
      })
    }
  })
}


exports.userNotes = (appData,name)=>{
  writeSummary(appData+name+'_Summary', document.getElementById('userNotes').value.replace(/\n/g, "[br]"));
}

exports.cargarResumen = function(path){
  cargar_resumen(path);
}

exports.saveInformation = function(info){
  information=info;
}
