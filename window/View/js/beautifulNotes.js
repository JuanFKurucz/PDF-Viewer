exports.beautifulNotes = function(textOfNote){
  borderColors= ['primary','seccondary','sucsses','danger','warning','info','dark']
  randomColor= borderColors[Math.floor(Math.random()*borderColors.length)];
  return `<div class="border border-${randomColor}"><p>${textOfNote}</p></div>`;
}
