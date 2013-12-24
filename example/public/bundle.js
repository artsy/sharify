(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var sayHi = require('./shared-module').sayHi,
    USER_AGENT = require('../').data.USER_AGENT
    ENV = require('../').data.ENV;

$(function() {
  alert(sayHi() + ', your user agent is: ' + USER_AGENT);
  $('h4').html(JSON.stringify(ENV));
});
},{"../":3,"./shared-module":2}],2:[function(require,module,exports){
var NAME = require('../').data.NAME;

module.exports.sayHi = function() {
  return "Hey " + NAME;
}
},{"../":3}],3:[function(require,module,exports){
// Middleware that injects the shared data and sharify script
module.exports = function(req, res, next) {
  res.locals.sharify = {
    data: module.exports.data,
    script: function() {
      return '<script type="text/javascript">' +
             'window.__sharifyData = ' + JSON.stringify(res.locals.sd) + ';' +
             '</script>';
    }
  };

  // Alias the sharify short-hand for convience
  res.locals.sd = {};
  for(var key in module.exports.data) {
    res.locals.sd[key] = module.exports.data[key];
  }
  next();
};

// The shared hash of data
module.exports.data = {};

// When required on the client via browserify, run this snippet that reads the
// sharify.script data and injects it into this module.
var bootstrapOnClient = module.exports.bootstrapOnClient = function() {
  if (typeof window != 'undefined' && window.__sharifyData) {
    module.exports.data = window.__sharifyData;
  }
};
bootstrapOnClient();

},{}]},{},[1])