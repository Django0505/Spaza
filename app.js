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

var mysql = require('mysql'),
    bodyParser = require('body-parser'),
    products = require('./routes/products'),
    orders = require('./routes/orders');

var myConnection = require('express-myconnection');

var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'spot',
      port: 3306,
      database: 'spaza'
};


//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 
// *****Import files into db******
// LOAD DATA LOCAL INFILE '/Users/Mysterion/codex/spaza-pair/Spaza/public/Sales.csv'
//INTO TABLE spaza.purchase_table
//FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\r';

// 
// 
// 




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
 
    res.render('home',{totalSales:totalSales});
});
app.get('/totalSales', function(req, res) {
 
    res.render('totalSales',{totalSales:totalSales});
});
app.get('/products',products.show);
app.post('/product',products.addProd);
app.post('/product/updateProd/:id',products.updateProd);
app.post('/product',products.deleteProd);
app.get('/regularSales', function(req, res) {
 
    res.render('regularSales',{regularSales:name});
});
app.get('/categories', function(req, res) {
    
    //var categories = yourModuleThatProcessTheData.getCategories();

    res.render('categories',{categories:categories});
});
//=======================================
//actions for Categories

app.get('/CatList',products.showCatList);
app.post('/cat',products.addCat);
app.post('/cat',products.deleteCat);

//========================================
//actions for Suppliers

app.get('/supplier',products.suppliers);
app.post('/supply',products.addSupplier);

//=========================================
//actions for purchases
app.get('/purchasesList',products.purchases);
app.post('/purchase',products.addPurchase);
app.get('/purchasesList',products.suppliers);
app.get('/products',products.show);


//===========================================
//actions for Sales
app.get('/spazaData',products.sales);



app.get('/mostSellingCategory', function(req, res) {
    
    //var mostSellingCategory = yourModuleThatProcessTheData.getCategories();

    res.render('mostSellingCategory',{mostSellingCategory: mostSellingCategory});
});

app.get('/*', function(req, res) {
 
    res.render('error', {layout: false});
});




var port = process.env.PORT || 3000;
var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

console.log('doing my thing at http://3000');
});























































