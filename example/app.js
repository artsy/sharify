var express = require('express');
var app = express();
var sharify = require('../');
var config = {
  NAME: 'Craig',
  API_URL: 'http://artsy.net/api/v1',
  PASSWORD: 'Super Secret!'
}

app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.get('*', function(req, res) {
  res.render('index');
});

sharify(config).pick('NAME', 'API_URL').add(app);

app.listen(4000, function() { console.log("Listening on 4000") });