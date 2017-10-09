/**
 * Muestra elementos que contienen el valor del parametro "name" y oculta los que no.
*/
exports.searchPDF=function(name){
  var contenedor=document.getElementById("pdfList").getElementsByTagName("li");
  if(name==""){
    for(var i=0;i<contenedor.length;i++){
      contenedor[i].style.display="";
    }
  } else {
    for(var i=0;i<contenedor.length;i++){
      if(contenedor[i].textContent.toLowerCase().includes(name.toLowerCase())){
        contenedor[i].style.display="";
      } else {
        contenedor[i].style.display="none";
      }
    }
  }
}
