var express = require('express');
var app = express();
var sharify = require('../');

app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.use(sharify({
  NAME: 'Craig',
  API_URL: 'http://artsy.net/api/v1',
  PASSWORD: 'Super Secret!'
}));

app.get('*', function(req, res) {
  res.render('index');
});

app.listen(4000, function() { console.log("Listening on 4000") });