const {ipcMain} = require('electron');
exports.init = function(appData){
  ipcMain.on('loaded', (event) => {
    event.sender.send('path', appData)
  })
}
