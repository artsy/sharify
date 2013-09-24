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