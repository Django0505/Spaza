var assert = require('assert'),
	mysql = require('mysql'),
	CatConnections = require('../routes/CatConnections');
var connection =  mysql.createConnection({
 host: 'localhost',
        user: 'root',
        password: 'spot',
        port: 3306,
        database: 'spaza'
});

connection.connect();
//connection.query('use spaza');
var catConnections = new CatConnections(connection);

describe('categoryMethods: Display', function() {
  it('showCategories: Should return a list of categories', function(done) {
    catConnections.showCategories(function(err, results){
      assert.equal(8, results.length);
      done();
    });
  });
});