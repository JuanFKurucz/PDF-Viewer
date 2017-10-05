exports.getPdfPage= function(){
  var documenttotalHeight = document.body.scrollHeight;
  var doc = document.documentElement;
  var documentCurrentHeight = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
  return {'documenttotalHeight': documenttotalHeight, 'documentCurrentHeight':documentCurrentHeight }
}
