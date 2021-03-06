[![npm version](https://badge.fury.io/js/wrtc-ice-cand-parse.svg)](http://badge.fury.io/js/wrtc-ice-cand-parse)
[![Build Status](https://travis-ci.org/alykoshin/wrtc-ice-cand-parse.svg)](https://travis-ci.org/alykoshin/wrtc-ice-cand-parse)
[![Coverage Status](http://coveralls.io/repos/alykoshin/wrtc-ice-cand-parse/badge.svg?branch=master&service=github)](http://coveralls.io/github/alykoshin/wrtc-ice-cand-parse?branch=master)
[![Code Climate](https://codeclimate.com/github/alykoshin/wrtc-ice-cand-parse/badges/gpa.svg)](https://codeclimate.com/github/alykoshin/wrtc-ice-cand-parse)
[![Inch CI](http://inch-ci.org/github/alykoshin/wrtc-ice-cand-parse.svg?branch=master)](http://inch-ci.org/github/alykoshin/wrtc-ice-cand-parse)

[![Dependency Status](https://david-dm.org/alykoshin/wrtc-ice-cand-parse/status.svg)](https://david-dm.org/alykoshin/wrtc-ice-cand-parse#info=dependencies)
[![devDependency Status](https://david-dm.org/alykoshin/wrtc-ice-cand-parse/dev-status.svg)](https://david-dm.org/alykoshin/wrtc-ice-cand-parse#info=devDependencies)

wrtc-ice-cand-parse
===================

WRTC Ice Candidate parse

This package is part of WRTC project.

Not yet ready for public usage.

Small helper to parse WebRTC ICE candidates string 

```
'candidate:2 1 UDP 92274687 12.123.12.123 12345 typ relay raddr 12.123.12.123 rport 54321'
```

 to JSON object 
 
```
{ foundation: '2',
  component_id: '1',
  transport: 'UDP',
  priority: '92274687',
  localIP: '12.123.12.123',
  localPort: '12345',
  type: 'relay',
  remoteIP: '12.123.12.123',
  remotePort: '54321',
  generation: undefined }
``` 
and stringify it back.

If some field is not present in original strig,
  
If you have different needs regarding the functionality, please add a [feature request](https://github.com/alykoshin/wrtc-ice-cand-parse/issues).


## Installation

```sh
npm install --save wrtc-ice-cand-parse
```

## Usage

Not yet ready for public usage.

'type' and 'transport' properties are case-sensitive, i.e. type 'TCP' and type 'tcp' are different, to compare you need to lowerCase them.

## Methods

### parse

### stringify

### validate


## Example

File `examples/parse.js`:

```
//iceParse = require('wrtc-ice-cand-parse');
var iceParse = require('../index.js');

var origStr = 'candidate:2 1 UDP 92274687 12.123.12.123 12345 typ relay raddr 12.123.12.123 rport 54321';
console.log('origStr:', origStr);

var candObj = iceParse.parse(origStr);
console.log('candObj:', candObj);

console.log('validate(candObj):',  iceParse.validate(candObj));

console.log('stringify(candObj):', iceParse.stringify(candObj));
```

```
node examples/parse.js 
```

```
origStr: candidate:2 1 UDP 92274687 12.123.12.123 12345 typ relay raddr 12.123.12.123 rport 54321
candObj: { foundation: '2',
  component_id: '1',
  transport: 'UDP',
  priority: '92274687',
  localIP: '12.123.12.123',
  localPort: '12345',
  type: 'relay',
  remoteIP: '12.123.12.123',
  remotePort: '54321',
  generation: undefined }
validate(candObj): true
stringify(candObj): candidate:2 1 UDP 92274687 12.123.12.123 12345 typ relay raddr 12.123.12.123 rport 54321
```

## Links to package pages:

[github.com](https://github.com/alykoshin/wrtc-ice-cand-parse) &nbsp; [npmjs.com](https://www.npmjs.com/package/wrtc-ice-cand-parse) &nbsp; [travis-ci.org](https://travis-ci.org/alykoshin/wrtc-ice-cand-parsel) &nbsp; [coveralls.io](https://coveralls.io/github/alykoshin/wrtc-ice-cand-parse) &nbsp; [inch-ci.org](http://inch-ci.org/github/alykoshin/wrtc-ice-cand-parse)
