const {app} = require("electron");
const {CheckLibrary} = require(__dirname+"/generateLibrary.js");
const window = require(__dirname+"/window/main.js");
app.on('ready', () => {
	CheckLibrary(app.getPath("userData"));
	window.init(app.getPath("userData"));
})
app.on('window-all-closed', () => {
  app.exit();
})
