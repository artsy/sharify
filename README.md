# sharify

Easily share data between your server-side and browserify modules.

## Example

Given an [express](https://github.com/visionmedia/express) app with [jade](https://github.com/visionmedia/jade).

**app.js**
````javascript
var sharify = require('sharify');
var app = require('express')();
sharify(process.env).pick('API_URL').add(app);
````

**index.jade**
````jade
html
  body
    #scripts
      //- Make sure this is above your other scripts
      != sharify.script
      script( src='/jquery.js' )
      script( src='/bundle.js' )
````

**client.js**
````javascript
// Browserify module
var sd = require('sharify').data;
var $ = require('jquery');
$(function() {
  $.ajax({ url: sd.API_URL + '/artwork/andy-warhol-skull' });
});
````

## API

## sharify(obj)

Includes a hash to be shared between modules.

## sharify.pick([keys...])

Whitelists keys to conveniently exclude sensitive data.

## sharify.add(app)

Adds `sharify` to an express app's locals and generates a script tag which can be accessed via `sharify.script`.

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `make test`

## License

MIT