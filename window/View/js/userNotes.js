var fs = require('fs');
console.log('hello');

document.onreadystatechange = function(){
  if(document.readyState == 'complete'){
    document.getElementById('saveUserNotes').onclick= function(){
      var resumen= document.getElementById('userNotes').value;
      console.log(document.getElementById('userNotes').value);
      fs.writeFile('resumen.txt', resumen, (err)=>{
        if(err) throw err;
        console.log('Your notes has been saved');
      })
  };
}
}
