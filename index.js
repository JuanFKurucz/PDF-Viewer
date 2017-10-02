const {app} = require("electron");
const window = require(__dirname+"/window/main.js");
app.on('ready', () => {
	window.init();
})
app.on('window-all-closed', () => {
  app.exit();
})
