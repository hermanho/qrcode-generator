'use strict';

var body_loadHander = function body_loadHander() {

  var crtOpt = function crtOpt(value, label) {
    var opt = document.createElement('option');
    opt.appendChild(document.createTextNode(label));
    opt.value = value;
    return opt;
  };

  var t = document.forms['qrForm'].elements['t'];
  t.appendChild(crtOpt('' + 0, 'Auto Detect'));
  for (var i = 1; i <= 40; i += 1) {
    t.appendChild(crtOpt('' + i, '' + i));
  }
  t.value = '0';

  update_qrcode();
};

var draw_qrcode = function draw_qrcode(text, typeNumber, errorCorrectionLevel) {
  document.write(create_qrcode(text, typeNumber, errorCorrectionLevel));
};

var create_qrcode = function create_qrcode(text, typeNumber, errorCorrectionLevel, mode, mb) {

  qrcode.stringToBytes = qrcode.stringToBytesFuncs[mb];

  var qr = qrcode(typeNumber || 4, errorCorrectionLevel || 'M');
  qr.addData(text, mode);
  qr.make();

  //  return qr.createTableTag();
  //  return qr.createSvgTag();
  return qr.createImgTag();
};

var update_qrcode = function update_qrcode() {
  var form = document.forms['qrForm'];
  var text = form.elements['msg'].value.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
  var t = form.elements['t'].value;
  var e = form.elements['e'].value;
  var m = form.elements['m'].value;
  var mb = form.elements['mb'].value;
  document.getElementById('qr').innerHTML = create_qrcode(text, t, e, m, mb);
};