# sharify

Easily share data between modules meant to run on the server and client using browserify.

## Example

Given an [express](https://github.com/visionmedia/express) app with [jade](https://github.com/visionmedia/jade).

Add middleware

````javascript
app.use(sharify({
  API_URL: 'http://artsy.net/api/v1',
  NODE_ENV: process.env.NODE_ENV
}));
````

Inject sharify script in the view

````jade
html
  body
    //- `sd` is short hand for sharify.data
    if sd.NODE_ENV == 'development'
      #debug-modal
    #scripts
      //- Make sure this is above your other scripts
      != sharifyScript()
      script( src='/bundle.js' )
````

Use in shared module

````javascript
var sd = require('sharify').data;

module.exports = function Artwork(id) {
  this.url = sd.API_URL + '/artwork/'  + this.id;
};
````

### Adding dynamic/request level data

Sharify simply injects data into the [response locals](http://expressjs.com/api.html#res.locals). If you'd like to add dynamic data that can be required on the client like the static data passed to the constructor, simply inject it into `res.locals.sd`.

````javascript
app.use(sharify({
  API_URL: 'http://artsy.net/api/v1',
  NODE_ENV: process.env.NODE_ENV
});
app.use(function(req, res, next) {
  res.locals.sd.SESSION_ID = req.session.id;
  res.locals.sd.AB_TEST = Math.random() > 0.5 ? 'A' : 'B';
  next();
});
// You can now get the session id on the client with `require('sharify').data.SESSION_ID`
````

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `make test`.

## License

MIT
