[![npm version](https://badge.fury.io/js/wrtc-ice-cand-parse.svg)](http://badge.fury.io/js/wrtc-ice-cand-parse)
[![Build Status](https://travis-ci.org/alykoshin/wrtc-ice-cand-parse.svg)](https://travis-ci.org/alykoshin/wrtc-ice-cand-parse)
[![Coverage Status](http://coveralls.io/repos/alykoshin/wrtc-ice-cand-parse/badge.svg?branch=master&service=github)](http://coveralls.io/github/alykoshin/wrtc-ice-cand-parse?branch=master)

[![Dependency Status](https://david-dm.org/alykoshin/wrtc-ice-cand-parse/status.svg)](https://david-dm.org/alykoshin/wrtc-ice-cand-parse#info=dependencies)
[![devDependency Status](https://david-dm.org/alykoshin/wrtc-ice-cand-parse/dev-status.svg)](https://david-dm.org/alykoshin/wrtc-ice-cand-parse#info=devDependencies)

wrtc-ice-cand-parse
===================

WRTC Ice Candidate parse

This package allows to parse WebRTC ICE candidates string `'candidate:3689538886 1 udp 2122199807 1234:5678:9abc:def0:6deb:9894:734:f75f 32950 typ host generation 0'` to JSON object 
`{ foundation: '3689538886',
  component_id: '1',
  transport: 'udp',
  priority: '2122199807',
  localIP: '1234:5678:9abc:def0:6deb:9894:734:f75f',
  localPort: '32950',
  type: 'host',
  remoteIP: undefined,
  remotePort: undefined,
  generation: '0' }` and vice versa.
  
This package is part of WRTC project.

Not yet ready for public usage.

If you have different needs regarding the functionality, please add a [feature request](https://github.com/alykoshin/wrtc-ice-cand-parse/issues).

## Installation

```sh
npm install --save wrtc-ice-cand-parse
```

## Usage

Not yet ready for public usage.

type and transport are case-sensitive, i.e. TCP and tcp are different, to compare you need to lowerCase them.


## Example

File `examples/parse.js`:

```
//iceParse = require('wrtc-ice-cand-parse');
var iceParse = require('../index.js');

var origStr = 'candidate:3689538886 1 udp 2122199807 1234:5678:9abc:def0:6deb:9894:734:f75f 32950 typ host generation 0';

var candObj = iceParse.parse(origStr);
console.log('candObj:', candObj);

var candStr = iceParse.stringify(candObj);
console.log('candStr:', candStr);
```

```
node examples/parse.js 
```
```
candObj: { foundation: '3689538886',
  component_id: '1',
  transport: 'udp',
  priority: '2122199807',
  localIP: '1234:5678:9abc:def0:6deb:9894:734:f75f',
  localPort: '32950',
  type: 'host',
  remoteIP: undefined,
  remotePort: undefined,
  generation: '0' }
candStr: candidate:3689538886 1 udp 2122199807 1234:5678:9abc:def0:6deb:9894:734:f75f 32950 typ host generation 0
```


