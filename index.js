'use strict';
/* global window */

(function(){

  var buf
  var str = ''
  var strIdx = 0
  var i
  var chars = 'abcdefghijkmnopqrstuvwxyz23456789ABCDEFGHIJKLMNPQRSTUVWXYZ'

  // Reduce calls to `crypto` by increasing this number (>=16)
  // Uses a tiny bit more memory to store the random bytes (try 16384)
  var BUFFER_SIZE = 8192

  // Test for uuid
  base58.test = isbase58
  
  // Attach methods for tests to use
  base58.generateBase58Math = generateBase58Math
  base58.generateBase58Node = generateBase58Node
  base58.generateBase58Browser = generateBase58Browser
  base58.initMath = initMath
  base58.initNode = initNode
  base58.initBrowser = initBrowser

  // Node & Browser support
  if ((typeof module !== 'undefined') && (typeof require === 'function')) {
    var crypto = require('crypto')
    module.exports = base58
  } else if (typeof window !== 'undefined') {
    window.base58 = base62
  }

  // Backup method
  function getRandomChar() {
    return chars[Math.floor(Math.random() * (58 - 0)) + 0]
  }

  // base58.test
  function isbase58(str) {
    if (typeof str === 'string') {
      return /^[2-9a-km-zA-NP-Z]+$/.test(str)
    }
    return false
  }

  function generateBase58Math(){
    for (i = 0; i < BUFFER_SIZE; i++) {
      buf[i] = getRandomChar()
    }
    strIdx = 0
    return str = buf.join('')
  }

  function generateBase58Node(){
    //console.error('generating str',strIdx)
    strIdx = 0
    return str = crypto.randomBytes(BUFFER_SIZE)
      .toString('base64')
      .replace(/[+.=/]/g,'')
  }
 
  // https://github.com/beatgammit/base64-js
  function generateBase58Browser(){
    buf = crypto.getRandomValues(buf)
    var tmp = Array(BUFFER_SIZE)
    for ( i=0; i<BUFFER_SIZE; i++){
      // wastes some bits, some bit pushing should save the extra 4
      tmp.push(chars[buf[i] % 58])
    }
    strIdx = 0
    return str = tmp.join('')
  }

  // Use best RNG as possible
  var generateBase58
  strIdx = BUFFER_SIZE

  function initMath(){
    str = ''
    buf = new Array(BUFFER_SIZE)
    generateBase58 = generateBase58Math
  }
  function initBrowser(){
    str = ''
    buf = new Uint8Array(BUFFER_SIZE)
    generateBase58 = generateBase58Browser 
  }
  function initNode(){
    str = ''
    generateBase58 = generateBase58Node
  }

  if (typeof crypto === 'undefined') {
    initMath()
  }
  else if (crypto.getRandomValues) {
    initBrowser()
  }
  else if (crypto.randomBytes) {
    initNode()
  }
  else {
    throw new Error('Non-standard crypto library')
  }


  // String UUIDv4 (Random)
  function base58(length) {
    if ( !length || typeof length !== 'number') throw new Error('base58 length must be a number "'+length+'"')
    if ( str.length < (strIdx+length) ) generateBase58()
    return str.slice(strIdx, (strIdx+=length))
  }

})()
