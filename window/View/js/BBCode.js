function Encode(text){
  var t=text;
  t=t.replace(/\n/g, "[br]");
  return t;
}

function Decode(text){
  var t=text;
  //Salto de linea: [br]
  t=t.replace(/\[br\]/g, "<br />");

  //Negrita: [b]text[/b]
  t=t.replace(/\[b\]/g, "<b>");
  t=t.replace(/\[\/b\]/g, "</b>");

  //Cursiva: [i]text[/i]
  t=t.replace(/\[i\]/g, "<i>");
  t=t.replace(/\[\/i\]/g, "</i>");

  //Subrayado: [u]text[/u]
  t=t.replace(/\[u\]/g, "<u>");
  t=t.replace(/\[\/u\]/g, "</u>");

  //Subrayado: [strike]text[/strike]
  t=t.replace(/\[strike\]/g, "<strike>");
  t=t.replace(/\[\/strike\]/g, "</strike>");

  //Subrayado: [hr]
  t=t.replace(/\[hr\]/g, "<hr/>");
  return t;
}

function BBCode(text,type){
  var newtext=text;
  if(text!=undefined && typeof text != "object"){
    switch(type){
      case "encode":
        newtext=Encode(text);
        break;
      case "decode":
        newtext=Decode(text);
        break;
    }
  }
  return newtext;
}

exports.decode=function(text){
  return BBCode(text,"decode");
}

exports.encode=function(text){
  return BBCode(text,"encode");
}
