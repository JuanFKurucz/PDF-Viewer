let $ = require('jquery');
const {dialog} = require('electron').remote;
const fs = require('fs');
const {app} = require('electron').remote;



//This function opens a dialog and let users Add new pdfs to their library folder. (It copyes the pdf file to library folder)
$(document).ready(()=>{
  $("#addNewPdf").click(()=>{

    var newPdfFile= (dialog.showOpenDialog({filters:[{name: 'All Files', extensions:['pdf']}], properties: ['openFile']})).toString();
    fileName= (newPdfFile.toString()).split('\\');
    console.log(newPdfFile);
    console.log(app.getPath('appData')+'/pdf/Library');
    console.log(`${fileName[fileName.length -1]}`);

    fs.createReadStream(newPdfFile).pipe(fs.createWriteStream((app.getPath('appData')+`/pdf/Library/${fileName[fileName.length -1]}`).toString()));
  });
})
