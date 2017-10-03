var remote = require('electron').remote;
const {ipcRenderer} = require('electron');

var fs = remote.require('fs');
var path = "C:/Users/PERSONAL/AppData/Roaming/pdf/Library";

var pdfFilesList = [];
fs.readdir(path, (err,files)=>{
  files.forEach(file =>{
    splitedByDots = file.split(".");
    if (splitedByDots[splitedByDots.length -1] === "pdf") {
      console.log(file);
      pdfFilesList.push(file);

    }
  });
  console.log(pdfFilesList);
});
