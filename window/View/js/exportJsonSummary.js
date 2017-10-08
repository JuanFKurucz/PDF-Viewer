let $ = require('jQuery');
const {dialog} = require('electron').remote;

console.log('exportJsonSummary Loaded')
//This function will export a summary json file to the path selected by the user.
$(document).ready(()=>{
  console.log('exportJsonSummary is now ready to work');
  $('#exportUserNotes').click(()=>{
    console.log(dialog.showSaveDialog({filters:[{name: 'Your Summary', extensions: ['json']}]}));
  });
});
