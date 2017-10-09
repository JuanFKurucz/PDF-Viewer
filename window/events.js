const {ipcMain} = require('electron');
const {getPdfs} = require(__dirname+"/showFilesList.js");
const {saveJson} = require(__dirname+"/exportPDFtoJson.js");
exports.init = function(appData,mainWindow){
  ipcMain.on('loaded', (event) => {
    event.sender.send('path', appData);
  })

  ipcMain.on('askPdfList', (event) => {
    getPdfs(appData+"/Library",function(err,content){
        event.sender.send('addPdfItems',content)
    });
  })
  ipcMain.on('exportPDFtoJSON', (event,path) => {
    saveJson(path)
  })

  ipcMain.on('taskBar', (event,type) => {
    switch(type){
      case "minimizar":
        mainWindow.minimize();
        break;
      case "cerrar":
        mainWindow.close();
        break;
    }
  })
}
