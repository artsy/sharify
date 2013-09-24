;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var sd = require('../').data;
$(function() {
  alert('Your user agent is ' + sd.USER_AGENT);
  $.ajax({ url: sd.API_URL + '/system/up' }).then(function(data) {
    if (data.rails) {
      alert("Artsy is up!");
    } else {
      alert("Uh oh, Artsy is down!");
    }
  });
});
},{"../":2}],2:[function(require,module,exports){
module.exports = function(data, reqDataCallback) {
  
  // Immediately export constant data
  module.exports.data = data;
  
  // Return middleware
  return function(req, res, next) {
    
    // Inject any request-level data
    if (reqDataCallback){
      var reqData = reqDataCallback(req);
      for(var key in reqData) {
        data[key] = reqData[key];
      }
    }
    
    // Pass in the locals needed to bootstrap the data
    res.locals.sd = data;
    res.locals.sharifyScript = '' +
      '<script type="text/javascript">' + 
        'window.__sharifyData = ' + JSON.stringify(data) + ';' +
      '</script>';
    
    next();
  };
};

module.exports.data = {};

// When required on the client via browserify, run this snippet that reads the
// bootstrapped data and injects it into this module.
if (typeof window != 'undefined' && window.__sharifyData) {
  module.exports.data = window.__sharifyData;
}
},{}]},{},[1])
;