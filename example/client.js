var sd = require('../').data;
$(function() {
  $.ajax({ url: sd.API_URL + '/system/up' }).then(function(data) {
    if (data.rails) {
      alert("Artsy is up!");
    } else {
      alert("Uh oh, Artsy is down!");
    }
  });
});