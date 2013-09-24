module.exports = function(obj) {
  for(var key in obj) {
    module.exports.data[key] = obj[key];
  }
  module.exports.script = '<script type="text/javascript">' + 
                          'window.__sharifyData = ' + JSON.stringify(module.exports.data) + ';' +
                          '</script>';
  return module.exports;
};

module.exports.use = function(app) {
  app.locals.sharify = module.exports;
  return module.exports;
};

module.exports.data = {};

module.exports.script = '';

// Client-side code to be run when bundled via browserify.
// Injects the bootstrapped data into the sharify.data hash.
if (typeof window != 'undefined' && window.__sharifyData) {
  module.exports.data = window.__sharifyData;
}