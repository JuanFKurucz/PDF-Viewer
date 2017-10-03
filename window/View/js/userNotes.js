var fs = require('fs');

function pdfActive(){
  var contenedor=document.getElementsByClassName("col-sm-8")[0].getElementsByTagName("webview");
  for(var w=0;w<contenedor.length;w++){
    if(contenedor[w].style.display!="none"){
      return contenedor[w].getAttribute("pdf").split(".")[0];
    }
  }
  return false;
}

exports.userNotes= (appdata)=>{
  var resumen = document.getElementById('userNotes').value;
  var nombrePDF=pdfActive();
  console.log(document.getElementById('userNotes').value);
  if(nombrePDF != false){
    fs.writeFile(appdata+nombrePDF+'.txt', resumen, (err)=>{
      if(err) throw err;
      console.log('Your notes has been saved');
    })
  }
}
