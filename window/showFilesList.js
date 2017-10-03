var fs = require('fs');

exports.get = function(path, callback){
  var pdfFilesList = [];
  fs.readdir(path, (err,files)=>{
    files.forEach(file =>{
      splitedByDots = file.split(".");
      if (splitedByDots[splitedByDots.length -1] === "pdf") {
        pdfFilesList.push(file);
      }
    });
    callback(null, pdfFilesList)
  })
}
