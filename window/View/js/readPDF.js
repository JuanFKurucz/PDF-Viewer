let fs = require('fs'),
PDFParser = require("pdf2json");

function saveJson(path){
  let pdfParser = new PDFParser();
  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
  pdfParser.on("pdfParser_dataReady", pdfData => {
  		fs.writeFile(path.replace(".pdf",".json"), JSON.stringify(pdfData));
  });
  pdfParser.loadPDF(path);
}

exports.exportPDF=function(path){
  saveJson(path);
}

function getNumber(path){
  fs.readFile(path,(err,data)=>{
    if(err) {
      throw err;
    }else{
      var diccionario = JSON.parse(data);
      return diccionario.formImage.Pages.length
    }
  })
}

exports.getNumberPages=function(path){
  if (fs.existsSync(path.replace(".pdf",".json"))) {
    return getNumber(path);
  } else {
    saveJson(path);
    return getNumber(path);
  }
}
