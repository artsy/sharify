module.exports = function(data) {
  return function(req, res, next) {
    if (typeof data == 'function') data = data(req);
    module.exports.data = res.locals.sd = data;
    res.locals.sharifyScript = '' +
      '<script type="text/javascript">' + 
        'window.__sharifyData = ' + JSON.stringify(data) + ';' +
      '</script>';
    next();
  };
};

module.exports.data = {};

// Client-side code to be run when bundled via browserify.
// Injects the bootstrapped data into the sharify.data hash.
if (typeof window != 'undefined' && window.__sharifyData) {
  module.exports.data = window.__sharifyData;
}