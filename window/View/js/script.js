var appData;
const {ipcRenderer} = require('electron');
const {addNewPdfItem} = require(__dirname+"/js/menu.js");
const addNewPdf = require(`${__dirname}/js/addNewPdf.js`);
const exportJsonSummary = require(`${__dirname}/js/exportJsonSummary.js`);
const searchPDF = require(`${__dirname}/js/search.js`);
const notesForm = require(`${__dirname}/js/notesForm.js`);
const jQuery = require('jQuery');
const Popper = require('popper.js');
require('bootstrap');
let $ = require('jQuery');

function reizeNotes(){
  document.getElementById("notes").style.maxHeight=parseInt(document.getElementById("resumenForm").offsetTop-document.getElementById("notes").offsetTop-50)+"px";
}
function init(){
  ipcRenderer.on('path', (event, arg) => {
    appData=arg+"/Library/";
  })
  ipcRenderer.send('loaded')
  ipcRenderer.on('addPdfItems', (event, list) => {
    for(element in list){
      addNewPdfItem(appData,list[element].substring(0,list[element].length-4));
    }
  })

  $("#userNotes").mousedown(reizeNotes);
  $("#userNotes").mouseup(reizeNotes);
  $("#userNotes").mouseover(reizeNotes);
  $("#userNotes").click(reizeNotes);

  document.getElementById('task').getElementsByTagName("li")[0].onclick= function(){
    ipcRenderer.send('taskBar',"minimizar")
  }
  document.getElementById('task').getElementsByTagName("li")[2].onclick= function(){
    ipcRenderer.send('taskBar',"cerrar");
  }

  ipcRenderer.send('askPdfList')
}
