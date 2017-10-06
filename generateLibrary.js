let fs = require('fs');

exports.CheckLibrary=function(path){
  if (!fs.existsSync(path+"\\Library")) {
      fs.mkdirSync(path+"\\Library");
  }
}
