let $ = require('jquery');
const {userNotes} = require(`${__dirname}/userNotes.js`);
/**
  https://stackoverflow.com/a/499158
**/
function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos (input, pos) {
  setSelectionRange(input, pos, pos);
}

/**
  End of stackoverflow
**/

function writeAndMove(bbcode){
  var cursorPosition = $('#userNotes').prop("selectionStart");
  var Alength=$("#userNotes").get(0).value.length;
  $("#userNotes").val($("#userNotes").val().substr(0,cursorPosition) + bbcode + $("#userNotes").val().substr(cursorPosition,$("#userNotes").val().length));
  setCaretToPos(document.getElementById("userNotes"),cursorPosition+bbcode.indexOf("]")+1);
}

$(document).ready(()=>{
  $("#saveUserNotes").click(()=>{
    userNotes(appData,$("#saveUserNotes").attr("pdfActive"));
  });

  $("#BBcode_negrita").click(()=>{
    writeAndMove("[b][/b]");
  });
  $("#BBcode_curisva").click(()=>{
    writeAndMove("[i][/i]");
  });
  $("#BBcode_subrayado").click(()=>{
    writeAndMove("[u][/u]");
  });
})
