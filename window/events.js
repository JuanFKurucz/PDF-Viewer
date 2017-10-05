const {ipcMain} = require('electron');
const {getPdfs} = require(__dirname+"/showFilesList.js");

exports.init = function(appData){
  ipcMain.on('loaded', (event) => {
    event.sender.send('path', appData);
  })

  ipcMain.on('askPdfList', (event) => {
    getPdfs(appData+"/Library",function(err,content){
        event.sender.send('addPdfItems',content)
    });
  })
  ipcMain.on('userNotes', (event) => {
    event.sender.send('addPdfItems',content)
  })
}
