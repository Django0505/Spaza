// var express = require('express');
// var exphbs = require('express-handlebars');
// var app = express();
// app.engine('handlebars', exphbs({
//     defaultLayout: 'main'
// }));

// app.set('view engine', 'handlebars');
// app.use(express.static('views'));

// app.get('/', function(req, res) {
//     res.render('index');
// });


// app.listen(3000);
// console.log('doing my thing at http://3000');





//var appSpaza = angular.module("Spaza", []);

var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
//
var passport = require('./auth');

var totalSales = require('./public/totalSold');
var categories = require('./public/categories.json');
var tableJs = require('./public/spazaData.json');
var name = require('./public/regularSales.json');
var mostSellingCategory = require('./public/mostSellingCategory.json');
//var mostRegularSales = ;






app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.use(express.static('views'));
app.use(express.static('public'));
// app.use(passport.initialize());
// app.use(passport.session());

//  //var productManager = new ProductManager(products);
// app.get('/', function(req, res) {
 
//     res.render('login', {layout: false});
// });
// app.post('/login', {layout: false}, function(req, res) {
//  	passport.authenticate('local', {
//  		failureRedirect: '/login',
//  		successRedirect: '/user'
//  	});
    
// });
// app.get('/user', routes.user ) {
 
//     res.render('login', {layout: false});
// };

app.get('/', function(req, res) {
 
    res.render('index',{totalSales:totalSales});
});
app.get('/regularSales', function(req, res) {
 
    res.render('regularSales',{regularSales:name});
});
app.get('/categories', function(req, res) {
    
    //var categories = yourModuleThatProcessTheData.getCategories();

    res.render('categories',{categories:categories});
});
app.get('/spazaData', function(req, res) {
    
    //var spazaData = yourModuleThatProcessTheData.getCategories();

    res.render('spazaData',{spazaData:tableJs});
});

app.get('/mostSellingCategory', function(req, res) {
    
    //var mostSellingCategory = yourModuleThatProcessTheData.getCategories();

    res.render('mostSellingCategory',{mostSellingCategory: mostSellingCategory});
});

app.get('/*', function(req, res) {
 
    res.render('error', {layout: false});
});







app.listen(3000);
console.log('doing my thing at http://3000');
























































