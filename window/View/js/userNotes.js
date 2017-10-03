var fs = require('fs');


exports.userNotes= (appdata)=>{
  var resumen = document.getElementById('userNotes').value;
  console.log(document.getElementById('userNotes').value);
  fs.writeFile(appdata+'resumen.txt', resumen, (err)=>{
    if(err) throw err;
    console.log('Your notes has been saved');
  })
}
