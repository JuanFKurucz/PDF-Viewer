const electron = require("electron");

let mainWindow;

function init(){
	mainWindow = new electron.BrowserWindow(
		{
			title:"Electron PDF Viewer",
			width: 940,
			height: 640,
			webPreferences: {
        plugins:true,
				preload:__dirname+'/panel/script.js'
			}
		}
	)
  mainWindow.loadURL(__dirname+"/index.html");
	//mainWindow.loadURL(__dirname+"/pdf.pdf");

}

electron.app.on('ready', function(){
	init();
})
electron.app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    electron.app.quit()
  }
})
electron.app.on('activate', function () {
  if (mainWindow === null) {
		init();
  }
})
