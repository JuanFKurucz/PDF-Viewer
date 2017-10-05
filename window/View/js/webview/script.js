const {ipcRenderer} = require('electron');
const {getPdfPage} = require(__dirname+"/getPdfPage.js");

window.onload=function(){
  document.body.onscroll = function(){
    ipcRenderer.sendToHost("window-data", getPdfPage());
  };
}
