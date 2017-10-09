let fs = require('fs'),
PDFParser = require("pdf2json");

exports.saveJson=function(path){
  let pdfParser = new PDFParser();
  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
  pdfParser.on("pdfParser_dataReady", pdfData => {
  		fs.writeFile(path.substring(0,path.length-4)+".json", JSON.stringify(pdfData), (error) => { });
  });
  pdfParser.loadPDF(path+".pdf");
}
