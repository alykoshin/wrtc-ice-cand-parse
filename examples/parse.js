//iceParse = require('wrtc-ice-cand-parse');
var iceParse = require('../index.js');

var origStr = 'candidate:3689538886 1 udp 2122199807 1234:5678:9abc:def0:6deb:9894:734:f75f 32950 typ host generation 0';

var candObj = iceParse.parse(origStr);
console.log('candObj:', candObj);

var candStr = iceParse.stringify(candObj);
console.log('candStr:', candStr);
