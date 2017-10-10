function parseBBCODE(text){
  var newtext=text;
  if(text!=undefined){
    newtext=newtext.replace(/\[br\]/g, "<br />");
  }
  return newtext;
}


exports.beautifulNotes = function(textOfNote){
  borderColors= ['primary','secondary','success','danger','warning','info','dark']
  randomColor= borderColors[Math.floor(Math.random()*borderColors.length)];
  var text=parseBBCODE(textOfNote);
  return `<div class="alert alert-${randomColor}"><p>${text}</p></div>`;
}
