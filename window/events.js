const {ipcMain} = require('electron');
const fs = require('fs');
const pdfs = require(__dirname+"/showFilesList.js");


exports.init = function(appData){
  ipcMain.on('loaded', (event) => {
    event.sender.send('path', appData);
  })

  ipcMain.on('askPdfList', (event) => {
    pdfs.get(appData+"/Library",function(err,content){
        event.sender.send('addPdfItems',content)
    });
  })
}
