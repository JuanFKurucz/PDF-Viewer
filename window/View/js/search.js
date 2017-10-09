let $ = require('jQuery');
/**
 * Muestra elementos que contienen el valor del parametro "name" y oculta los que no.
*/
var searchPDF=function(name){
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

/**
 * Los siguientes son eventos que esperan la accion del usuario con el input de busqueda de pdfs.
*/
$(document).ready(()=>{
  $('#search').change(()=>{
    searchPDF($('#search').val());
  });
  $('#search').keydown(()=>{
    searchPDF($('#search').val());
  });
  $('#search').keyup(()=>{
    searchPDF($('#search').val());
  });
});
