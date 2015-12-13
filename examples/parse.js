//iceParse = require('wrtc-ice-cand-parse');
var iceParse = require('../index.js');

var origStr = 'candidate:2 1 UDP 92274687 12.123.12.123 12345 typ relay raddr 12.123.12.123 rport 54321';

var candObj = iceParse.parse(origStr);
console.log('candObj:', candObj);

console.log('validate():', iceParse.validate(candObj));

var candStr = iceParse.stringify(candObj);
console.log('candStr:', candStr);
