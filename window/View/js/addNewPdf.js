let $ = require('jquery');
const {dialog} = require('electron').remote;


//This function will crceate a new summary json file, this json file will include the path to the pdf document
$(document).ready(()=>{
  $("#addNewPdf").click(()=>{
    //console.log(dialog.showOpenDialog({filters:[{name: 'All Files', extensions:['pdf']}], properties: ['openFile']}));
  });
})
