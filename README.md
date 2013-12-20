# sharify

Easily share data between modules meant to run on the server and client using browserify.

## Example

The following example shares a [Backbone Model](http://backbonejs.org/) between the server and browser. However, this could be applied to any module shared server/client.

Inject some constant data on the server

````javascript
var sharify = require('sharify');
sharify.data = {
  API_URL: 'http://artsy.net/api/v1',
  NODE_ENV: process.env.NODE_ENV
};
//...
app.listen();
````

Use in a module that can run on the server or client using Browserify

````javascript
var backbone = require('backbone'),
    API_URL = require('sharify').data;

module.exports = Artwork = Backbone.Model.extend({
  url: API_URL + '/artwork/'  + this.id
};
````

Add middleware, and use sharify data to [bootstrap](http://backbonejs.org/#FAQ-bootstrap) dynamic data as well.

````javascript
var Artwork = require('../models/artwork');

app.use(sharify);
app.get('artwork/:id', function(req, res, next) {
  new Artwork({ id: req.params.id }).fetch({
    success: function(artwork) {

      // Inject the fetched JSON into sharify so we can
      // require it on the client.
      res.locals.sharify.data.ARTWORK_JSON = artwork.toJSON();
      next();
    }
  });
});
````

Inject sharify script in the view

````jade
html
  body
    if sharify.data.NODE_ENV == 'development'
      #debug-modal
    #scripts
      //- Make sure this is above your other scripts
      != sharify.script()
      script( src='/bundle.js' )
````

Use sharify data on the client

````javascript
var Artwork = require('../models/artwork'),
    ARTWORK_JSON = require('sharify').data.ARTWORK_JSON,
    View = require('view.js');

new View({ model: new Artwork(ARTWORK_JSON) });
````

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `make test`.

## License

MIT
