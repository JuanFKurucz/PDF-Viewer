const {app} = require("electron");
const window = require(__dirname+"/window/main.js")
app.on('ready', function(){
	window.init()
})
app.on('window-all-closed', function () {
  app.exit()
})
