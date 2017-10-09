const {ipcRenderer} = require('electron');
const {addNewPdfItem} = require(__dirname+"/js/menu.js");
const {userNotes} = require(`${__dirname}/js/userNotes.js`);
const addNewPdf = require(`${__dirname}/js/addNewPdf.js`);
const exportJsonSummary = require(`${__dirname}/js/exportJsonSummary.js`);
const {searchPDF} = require(`${__dirname}/js/search.js`);
const jQuery = require('jQuery');
const Popper = require('popper.js');
require('bootstrap');
var appData;

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
  document.getElementById('saveUserNotes').onclick= function(){
    userNotes(appData,this.getAttribute("pdfActive"));
    document.getElementById("notes").value="";
  }
  document.querySelector("#search").onchange=function(){
    searchPDF(this.value);
  }
  document.querySelector("#search").onkeydown=function(){
    searchPDF(this.value);
  }
  document.querySelector("#search").onkeyup=function(){
    searchPDF(this.value);
  }
  ipcRenderer.send('askPdfList')
}
