/**
 * Created by alykoshin on 7/16/14.
 */

'use strict';

/**--------------------------------------------------------------------------------------------------------------------//
 // http://tools.ietf.org/html/rfc5245#section-15.1
 //
 //  candidate-attribute   = "candidate" ":" foundation SP component-id SP
 //                          transport SP
 //                          priority SP
 //                          connection-address SP     ;from RFC 4566
 //                          port         ;port from RFC 4566
 //                          SP cand-type
 //                          [SP rel-addr]
 //                          [SP rel-port]
 //                          *(SP extension-att-name SP
 //                               extension-att-value)
 //
 //  foundation            = 1*32ice-char
 //  component-id          = 1*5DIGIT
 //  transport             = "UDP" / transport-extension
 //  transport-extension   = token              ; from RFC 3261
 //  priority              = 1*10DIGIT
 //  cand-type             = "typ" SP candidate-types
 //  candidate-types       = "host" / "srflx" / "prflx" / "relay" / token
 //  rel-addr              = "raddr" SP connection-address
 //  rel-port              = "rport" SP port
 //  extension-att-name    = byte-string    ;from RFC 4566
 //  extension-att-value   = byte-string
 //  ice-char              = ALPHA / DIGIT / "+" / "/"
 //
 * ------------------------------------------------------------------------------
 * From RFC3261:
 *    token       =  1*(alphanum / "-" / "." / "!" / "%" / "*"
 *                   / "_" / "+" / "`" / "'" / "~" )
 *
 *    transport-param   =  "transport="
 *                      ( "udp" / "tcp" / "sctp" / "tls"
 *                      / other-transport)
 *    other-transport   =  token
 * ------------------------------------------------------------------------------

 // Chrome example:
 //   a=candidate:1832966643 1 tcp 1509957375 192.168.1.32 0 typ host generation 0
 //   a=candidate:3587398871 1 udp 1845501695 109.173.108.140 46670 typ srflx raddr 192.168.1.32 rport 46670 generation 0
 //   a=candidate:3454638549 1 udp 33562367 184.72.220.242 64560 typ relay raddr 109.173.108.140 rport 48485 generation 0
 // Firefox example - no 'a=' part !!! : (and now for Chrome too)
 //   candidate:0 1 UDP 2122252543 192.168.1.32 45166 typ host
 //   candidate:2 1 UDP 92274687 54.213.44.224 49185 typ relay raddr 54.213.44.224 rport 49185
 //--------------------------------------------------------------------------------------------------------------------//
 //  function extractIceCandidateType(string) {
//    var ICE_TYPE_RE = /typ\s(host|srflx|prflx|relay)/;
//    return string.match(ICE_TYPE_RE)[1];
//  }

 // 2015-08-24 - new version of ICE in Chrome:
 // candidate:599991555 2 udp 2122260222 192.168.1.32 49827 typ host generation 0
 // {"candidate":"candidate:3689538886 1 udp 2122199807 fde8:cd2d:634c:6b00:6deb:9894:734:f75f 32950 typ host generation 0","sdpMid":"video","sdpMLineIndex":1}

 **/

/**
 * @type ICE_TYPE
 * @const
 */
var ICE_TYPE = Enum( {
  HOST:  'host',
  SRFLX: 'srflx',
  PRFLX: 'prflx',
  RELAY: 'relay'
});

/**
 * @type ICE_TRANSPORT
 * @const
 */
var ICE_TRANSPORT = Enum({
  TCP: 'tcp',
  UDP: 'udp'
});

/**
 * @typedef  {{foundation:string, component_id:string, transport: string, priority: string, localIP: string, localPort: string, type: string, remoteIP: string, remotePort: string, generation: string}} ParsedIce
 */

/**
 *
 * @param {string} candidateString
 * @returns {ParsedIce}
 */
function parseIceCandidate(candidateString) {
  /** token                 =  1*(alphanum / "-" / "." / "!" / "%" / "*"
   *                          / "_" / "+" / "`" / "'" / "~" ) */
  var token_re              = '[0-9a-zA-Z\\-\\.!\\%\\*_\\+\\`\\\'\\~]+';

  /** ice-char              = ALPHA / DIGIT / "+" / "/"                 **/
  var ice_char_re           = '[a-zA-Z0-9\\+\\/]+';

  /** foundation            = 1*32ice-char    **/
  var foundation_re         = ice_char_re;

  /** component-id          = 1*5DIGIT        **/
  var component_id_re       = '[0-9]{1,5}';

  /** transport             = "UDP" / transport-extension **/
  /** transport-extension   = token      ; from RFC 3261 **/
  var transport_re          = token_re;
  /* ICE_TRANSPORT.TCP.toLowerCase() + '|' +
   ICE_TRANSPORT.UDP.toLowerCase() + '|' +
   ICE_TRANSPORT.TCP.toUpperCase() + '|' +
   ICE_TRANSPORT.UDP.toUpperCase() ,          */

  /** priority              = 1*10DIGIT                  **/
  var priority_re           = '[0-9]{1,10}';

  /** connection-address SP     ; from RFC 4566         **/
  var connection_address_v4_re = '[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}';
  var connection_address_v6_re = '\\:?(?:[0-9a-fA-F]{0,4}\\:?)+'; // fde8:cd2d:634c:6b00:6deb:9894:734:f75f

  var connection_address_re = '(?:'+connection_address_v4_re +')|(?:' + connection_address_v6_re+')';

  /** port                      ; port from RFC 4566                   **/
  var port_re               = '[0-9]{1,5}';

  /**  cand-type            = "typ" SP candidate-types   **/
  /**  candidate-types      = "host" / "srflx" / "prflx" / "relay" / token **/
  var cand_type_re  = token_re;
  /* ICE_TYPE.HOST  + '|' +
   ICE_TYPE.SRFLX + '|' +
   ICE_TYPE.PRFLX + '|' +
   ICE_TYPE.RELAY ;*/

  var ICE_RE = /*'a=' +*/ 'candidate:(' + foundation_re + ')' + // candidate:599991555 // 'a=' not passed for Firefox (and now for Chrome too)
    '\\s' + '(' + component_id_re       + ')' +                 // 2
    '\\s' + '(' + transport_re          + ')' +                 // udp
    '\\s' + '(' + priority_re           + ')' +                 // 2122260222
    '\\s' + '(' + connection_address_re + ')' +                 // 192.168.1.32 || fde8:cd2d:634c:6b00:6deb:9894:734:f75f
    '\\s' + '(' + port_re               + ')' +                 // 49827
    '\\s' +       'typ'                 +                       // typ
    '\\s' + '(' + cand_type_re          + ')' +                 // host
    '(?:'                               +
    '\\s' +       'raddr'               +
    '\\s' + '(' + connection_address_re + ')' +
    '\\s' +       'rport'               +
    '\\s' + '(' + port_re               + ')' +
    ')?'                                +
    '(?:'                               +
    '\\s' + 'generation'                +                       // generation
    '\\s' + '(' + '\\d+'                + ')' +                 // 0
    ')?'                           ;

  var pattern = new RegExp( ICE_RE);
  var parsed  = candidateString.match(pattern);

//  debug.log('parseIceCandidate(): candidateString:', candidateString);
//  debug.log('parseIceCandidate(): pattern:', pattern);
//  debug.log('parseIceCandidate(): parsed:', parsed);

  /** Check validity **/
  if ( !parsed ) {
    debug.warn('parseIceCandidate(): parsed is empty: \'' + parsed + '\'');
  }
  var type = parsed[7] ? parsed[7].toLowerCase() : null;
  ICE_TYPE.check(type);

  var transport = parsed[3];
  ICE_TRANSPORT.check(transport.toLowerCase());

  return {
    foundation: parsed[1],
    component_id: parsed[2],
    transport:  parsed[3],
    priority:   parsed[4],
    localIP:    parsed[5],
    localPort:  parsed[6],
    type:       parsed[7],
    remoteIP:   parsed[8],
    remotePort: parsed[9],
    generation: parsed[10]
  };
}


var stringify = function(ParsedIce) {
  throw 'Not implemented';
};


/**
 *
 *
 * @param {string} candidateString
 * @returns {boolean}
 */
function isRelayCandidate( candidateString ) {
  /** @type {ParsedIce} **/
  var parsed = parseIceCandidate( candidateString );
  return (parsed.type === ICE_TYPE.RELAY);
}



if (typeof module !== 'undefined') {
  module.exports = {
    parse: parseIceCandidate,
    stringify: stringify,
    isRelayCandidate: isRelayCandidate
  };
}

if (typeof window !== 'undefined') {
  window.parse = parseIceCandidate;
  window.stringify = stringify;
  window.isRelayCandidate  = isRelayCandidate;
}
