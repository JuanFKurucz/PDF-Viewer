const {BrowserWindow} = require("electron");

exports.init = function(){
  let mainWindow = new BrowserWindow();
  mainWindow.loadURL(__dirname+"/View/index.html");
  mainWindow.on("close", () => {
    mainWindow=null;
  })
}
