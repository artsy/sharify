# sharify

Easily share data between your server-side and browserify modules.

## Example

Given an [express](https://github.com/visionmedia/express) app with [jade](https://github.com/visionmedia/jade).

1. Add middleware

````javascript
app.use(sharify({
  API_URL: 'http://artsy.net/api/v1',
  NODE_ENV: process.env.NODE_ENV
}));
````

2. Inject script and use data in template if you want

````jade
html
  body
    #scripts
      //- Make sure this is above your other scripts
      != sharifyScript()
      script( src='/bundle.js' )
      //- `sd` is short hand for sharify.data
      if sd.NODE_ENV == 'production'
        include ./google-analytics.html
````

3. Use in browserify/server-side modules

````javascript
var sd = require('sharify').data;
module.exports = function Artwork(id) {
  this.url = sd.API_URL + '/artwork/'  + this.id;
};
````

# Dynamic request level data

Sharify simply injects data into the response locals. If you'd like to add dynamic data that can be required on the client like the static data simply inject it into `res.locals.sd`.

````javascript
app.use(sharify({
  API_URL: 'http://artsy.net/api/v1',
  NODE_ENV: process.env.NODE_ENV
});
app.use(function(req, res, next) {
  res.locals.sd.SESSION_ID = req.session.id;
});
````

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `make test`.

## License

MIT
