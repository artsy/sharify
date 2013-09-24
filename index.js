module.exports = function(data) {
  
  // Immediately export constant data;
  if (typeof data == 'object'){
    module.exports.data = data;
  }
  
  // Return middleware
  return function(req, res, next) {
    var resData = {};
    
    // Inject any request-level data
    if (typeof data == 'function'){
      var resData = data(req);
    }
    
    // Clone the original data object
    for(var key in module.exports.data) {
      resData[key] = module.exports.data[key];
    }
    
    // Pass in the locals needed to bootstrap the data
    res.locals.sd = resData;
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