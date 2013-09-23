var sharify = require('./');

describe('sharify', function() {
  
  describe('constructor', function() {
    
    it('adds to the data', function() {
      sharify({ foo: 'bar' }).data.foo.should.equal('bar');
    });
  });
  
  describe('#pick', function() {

    it('rejects data', function() {
      ('undefined' == typeof sharify({ foo: 'bar', bar: 'baz' }).pick('foo').bar).should.be.ok
    });
  });
  
  describe('#add', function() {

    it('adds the data to an express app locals', function() {
      var app = { locals: {} }
      sharify({ foo: 'bar' }).add(app);
      app.locals.sharify.data.foo.should.equal('bar');
    });
    
    it('generates a script that can be included on the client', function() {
      var app = { locals: {} }
      sharify({ foo: 'bar' }).add(app).script.should
        .include('window.__sharifyData = {"foo":"bar"};')
    });
  });
  
  describe('on the client', function() {

    it('loads __sharifyData', function() {
      global.window = { __sharifyData: { moo: 'bam' } };
      delete require.cache['/Users/craigspaeth/sharify/index.js']
      var sharify = require('./');
      sharify.data.moo.should.equal('bam');
    });
  });
});