//iceParse = require('wrtc-ice-cand-parse');
var iceParse = require('../index.js');

var origStr = 'candidate:2 1 UDP 92274687 12.123.12.123 12345 typ relay raddr 12.123.12.123 rport 54321';
console.log('origStr:', origStr);

var candObj = iceParse.parse(origStr);
console.log('candObj:', candObj);

console.log('validate(candObj):',  iceParse.validate(candObj));

console.log('stringify(candObj):', iceParse.stringify(candObj));
