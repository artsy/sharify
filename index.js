var _ = require('underscore');

module.exports = function(obj) {
  module.exports.data = _.extend(module.exports.data, obj);
  return module.exports;
};

module.exports.pick = function() {
  module.exports.data = _.pick(module.exports.data, _.toArray(arguments));
  return module.exports;
};

module.exports.add = function(app) {
  app.locals.sharify = module.exports;
  module.exports.script = '<script type="text/javascript">' + 
                          'window.__sharifyData = ' + JSON.stringify(module.exports.data) + ';' +
                          '</script>';
  return module.exports;
};

module.exports.data = {};

module.exports.script = '';

// Client-side code to be run when bundled via browserify.
// Injects the bootstrapped data into the sharify.data hash.
if (typeof window != 'undefined' && window.__sharifyData) {
  module.exports.data = window.__sharifyData;
}