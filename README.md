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
      != sharifyScript
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

Sharify can also share dynamic data per request, just pass a callback as the second argument to access the request object and your browserified code can require it like constant data.

````javascript
app.use(sharify(
  {
    API_URL: 'http://artsy.net/api/v1',
    NODE_ENV: process.env.NODE_ENV
  },
  function(req) {
    return {
      SESSION_ID: req.session.id,
      USER_AGENT: req.headers['user-agent'],
      AB_TEST: Math.random() > 0.5 ? 'A' : 'B'
    }
  }
);
````

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `make test`.

## License

MIT
