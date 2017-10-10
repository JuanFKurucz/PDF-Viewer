const {decode} = require(__dirname+"/BBCode.js");

exports.beautifulNotes = function(textOfNote){
  borderColors= ['primary','secondary','success','danger','warning','info','dark']
  randomColor= borderColors[Math.floor(Math.random()*borderColors.length)];
  return `<div class="alert alert-${randomColor}"><p>${decode(textOfNote)}</p></div>`;
}
