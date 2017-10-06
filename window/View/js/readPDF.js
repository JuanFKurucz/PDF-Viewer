let fs = require('fs');

exports.getNumberPages=function(path,callback){
  console.log(path);
  fs.readFile(path+'.json',(err,data)=>{
    var length=0;
    if(err) {
      throw err;
    }else{
      var diccionario = JSON.parse(data);
      length=diccionario["formImage"]["Pages"].length;
    }
    callback(null,length);
  })
}
