const {ipcRenderer} = require('electron');
const {addNewPdfItem} = require(__dirname+"/js/menu.js");
const {userNotes} = require(`${__dirname}/js/userNotes.js`);
var appData;

function init(){
  ipcRenderer.on('path', (event, arg) => {
    appData=arg+"/Library/";
  })
  ipcRenderer.send('loaded')
  ipcRenderer.on('addPdfItems', (event, list) => {
    for(element in list){
      addNewPdfItem(appData,list[element]);
    }
  })
  document.getElementById('saveUserNotes').onclick= function(){
    userNotes(appData);
  }
  ipcRenderer.send('askPdfList')
}
