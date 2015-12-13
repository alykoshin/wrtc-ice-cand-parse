'use strict';

/* globals describe, before, after, it */

var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe('#node tests', function() {

  GLOBAL.window = {}; // Imitate global window object
  var wrtc_ice_cand_parse = require('../index');

  before('before', function () {
  });

  it('should parse/validate/stringify old Chrome format (\'a=\') for host and IPv4', function () {
    var str1 = 'a=candidate:1832966643 1 tcp 1509957375 192.168.1.32 0 typ host generation 0';
    var cand = wrtc_ice_cand_parse.parse(str1);
    cand.should.have.property('foundation');   cand.foundation.should.equal('1832966643');
    cand.should.have.property('component_id'); cand.component_id.should.equal('1');
    cand.should.have.property('transport');    cand.transport.should.equal('tcp');
    cand.should.have.property('priority');     cand.priority.should.equal('1509957375');
    cand.should.have.property('localIP');      cand.localIP.should.equal('192.168.1.32');
    cand.should.have.property('localPort');    cand.localPort.should.equal('0');
    cand.should.have.property('type');         cand.type.should.equal('host');
    cand.should.have.property('remoteIP');     should.equal(cand.remoteIP, undefined);
    cand.should.have.property('remotePort');   should.equal(cand.remotePort, undefined);
    cand.should.have.property('generation');   cand.generation.should.equal('0');
    wrtc_ice_cand_parse.validate(cand).should.be.true;
    var str2 = wrtc_ice_cand_parse.stringify(cand, {oldChrome:true});
    should.equal(str1, str2);
  });

  it('should parse/validate/stringify old Chrome format (\'a=\') for srflx and IPv4', function () {
    var str1 = 'a=candidate:3587398871 1 udp 1845501695 123.123.123.123 46670 typ srflx raddr 192.168.1.32 rport 46670 generation 0';
    var cand = wrtc_ice_cand_parse.parse(str1);
    cand.should.have.property('foundation');   cand.foundation.should.equal('3587398871');
    cand.should.have.property('component_id'); cand.component_id.should.equal('1');
    cand.should.have.property('transport');    cand.transport.should.equal('udp');
    cand.should.have.property('priority');     cand.priority.should.equal('1845501695');
    cand.should.have.property('localIP');      cand.localIP.should.equal('123.123.123.123');
    cand.should.have.property('localPort');    cand.localPort.should.equal('46670');
    cand.should.have.property('type');         cand.type.should.equal('srflx');
    cand.should.have.property('remoteIP');     should.equal(cand.remoteIP, '192.168.1.32');
    cand.should.have.property('remotePort');   should.equal(cand.remotePort, '46670');
    cand.should.have.property('generation');   cand.generation.should.equal('0');
    wrtc_ice_cand_parse.validate(cand).should.be.true;
    var str2 = wrtc_ice_cand_parse.stringify(cand, {oldChrome:true});
    should.equal(str1, str2);
  });

  it('should parse/validate/stringify old Chrome format (\'a=\') for relay and IPv4', function () {
    var str1 = 'a=candidate:3454638549 1 udp 33562367 123.12.123.123 64560 typ relay raddr 123.123.123.123 rport 48485 generation 0';
    var cand = wrtc_ice_cand_parse.parse(str1);
    cand.should.have.property('foundation');   cand.foundation.should.equal('3454638549');
    cand.should.have.property('component_id'); cand.component_id.should.equal('1');
    cand.should.have.property('transport');    cand.transport.should.equal('udp');
    cand.should.have.property('priority');     cand.priority.should.equal('33562367');
    cand.should.have.property('localIP');      cand.localIP.should.equal('123.12.123.123');
    cand.should.have.property('localPort');    cand.localPort.should.equal('64560');
    cand.should.have.property('type');         cand.type.should.equal('relay');
    cand.should.have.property('remoteIP');     should.equal(cand.remoteIP, '123.123.123.123');
    cand.should.have.property('remotePort');   should.equal(cand.remotePort, '48485');
    cand.should.have.property('generation');   cand.generation.should.equal('0');
    wrtc_ice_cand_parse.validate(cand).should.be.true;
    var str2 = wrtc_ice_cand_parse.stringify(cand, {oldChrome:true});
    should.equal(str1, str2);
  });

  //

  it('should parse/validate/stringify Firefox (and new Chrome) format for host and IPv4', function () {
    var str1 = 'candidate:0 1 UDP 2122252543 192.168.1.32 45166 typ host';
    var cand = wrtc_ice_cand_parse.parse(str1);
    cand.should.have.property('foundation');   cand.foundation.should.equal('0');
    cand.should.have.property('component_id'); cand.component_id.should.equal('1');
    cand.should.have.property('transport');    cand.transport.should.equal('UDP');
    cand.should.have.property('priority');     cand.priority.should.equal('2122252543');
    cand.should.have.property('localIP');      cand.localIP.should.equal('192.168.1.32');
    cand.should.have.property('localPort');    cand.localPort.should.equal('45166');
    cand.should.have.property('type');         cand.type.should.equal('host');
    cand.should.have.property('remoteIP');     should.equal(cand.remoteIP, undefined);
    cand.should.have.property('remotePort');   should.equal(cand.remotePort, undefined);
    cand.should.have.property('generation');   should.equal(cand.generation, undefined);
    wrtc_ice_cand_parse.validate(cand).should.be.true;
    var str2 = wrtc_ice_cand_parse.stringify(cand);
    should.equal(str1, str2);
  });

  it('should parse/validate/stringify Firefox (and new Chrome) format for relay and IPv4', function () {
    var str1 = 'candidate:2 1 UDP 92274687 12.123.12.123 49185 typ relay raddr 12.123.12.123 rport 49185';
    var cand = wrtc_ice_cand_parse.parse(str1);
    cand.should.have.property('foundation');   cand.foundation.should.equal('2');
    cand.should.have.property('component_id'); cand.component_id.should.equal('1');
    cand.should.have.property('transport');    cand.transport.should.equal('UDP');
    cand.should.have.property('priority');     cand.priority.should.equal('92274687');
    cand.should.have.property('localIP');      cand.localIP.should.equal('12.123.12.123');
    cand.should.have.property('localPort');    cand.localPort.should.equal('49185');
    cand.should.have.property('type');         cand.type.should.equal('relay');
    cand.should.have.property('remoteIP');     should.equal(cand.remoteIP, '12.123.12.123');
    cand.should.have.property('remotePort');   should.equal(cand.remotePort, '49185');
    cand.should.have.property('generation');   should.equal(cand.generation, undefined);
    wrtc_ice_cand_parse.validate(cand).should.be.true;
    var str2 = wrtc_ice_cand_parse.stringify(cand);
    should.equal(str1, str2);
  });

  //

  it('should parse/validate/stringify (Firefox and) new Chrome format for host and IPv4', function () {
    var str1 = 'candidate:599991555 2 udp 2122260222 192.168.1.32 49827 typ host generation 0';
    var cand = wrtc_ice_cand_parse.parse(str1);
    cand.should.have.property('foundation');   cand.foundation.should.equal('599991555');
    cand.should.have.property('component_id'); cand.component_id.should.equal('2');
    cand.should.have.property('transport');    cand.transport.should.equal('udp');
    cand.should.have.property('priority');     cand.priority.should.equal('2122260222');
    cand.should.have.property('localIP');      cand.localIP.should.equal('192.168.1.32');
    cand.should.have.property('localPort');    cand.localPort.should.equal('49827');
    cand.should.have.property('type');         cand.type.should.equal('host');
    cand.should.have.property('remoteIP');     should.equal(cand.remoteIP, undefined);
    cand.should.have.property('remotePort');   should.equal(cand.remotePort, undefined);
    cand.should.have.property('generation');   cand.generation.should.equal('0');
    wrtc_ice_cand_parse.validate(cand).should.be.true;
    var str2 = wrtc_ice_cand_parse.stringify(cand);
    should.equal(str1, str2);
  });

  it('should parse/validate/stringify (Firefox and) new Chrome format for host and IPv6', function () {
    var str1 = 'candidate:3689538886 1 udp 2122199807 1234:5678:9abc:def0:6deb:9894:734:f75f 32950 typ host generation 0';
    var cand = wrtc_ice_cand_parse.parse(str1);
    cand.should.have.property('foundation');   cand.foundation.should.equal('3689538886');
    cand.should.have.property('component_id'); cand.component_id.should.equal('1');
    cand.should.have.property('transport');    cand.transport.should.equal('udp');
    cand.should.have.property('priority');     cand.priority.should.equal('2122199807');
    cand.should.have.property('localIP');      cand.localIP.should.equal('1234:5678:9abc:def0:6deb:9894:734:f75f');
    cand.should.have.property('localPort');    cand.localPort.should.equal('32950');
    cand.should.have.property('type');         cand.type.should.equal('host');
    cand.should.have.property('remoteIP');     should.equal(cand.remoteIP, undefined);
    cand.should.have.property('remotePort');   should.equal(cand.remotePort, undefined);
    cand.should.have.property('generation');   cand.generation.should.equal('0');
    wrtc_ice_cand_parse.validate(cand).should.be.true;
    var str2 = wrtc_ice_cand_parse.stringify(cand);
    should.equal(str1, str2);
  });

  it('should tolerate invalid (empty) candidate string', function () {
    var str1 = '';
    var cand = wrtc_ice_cand_parse.parse(str1);
    should.equal(cand, null);
  });

  it('should isRelayCandidate (Firefox and) new Chrome format for host and IPv6', function () {
    var str1 = 'candidate:3689538886 1 udp 2122199807 1234:5678:9abc:def0:6deb:9894:734:f75f 32950 typ host generation 0';
    expect(wrtc_ice_cand_parse.isRelay(str1)).be.false;
  });

  it('should isRelayCandidate (Firefox and) new Chrome format for host and IPv6', function () {
    var str1 = 'candidate:2 1 UDP 92274687 12.123.12.123 49185 typ relay raddr 12.123.12.123 rport 49185';
    expect(wrtc_ice_cand_parse.isRelay(str1)).be.true;
  });

});
