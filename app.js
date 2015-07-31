var express = require('express'),
    exphbs = require('express-handlebars'),
    app = express(),
    session = require('express-session');
app.set('strict routing', true);
app.set('x-powered-by', false)
app.set('Admin', false);
var totalSales = require('./public/totalSold');
    categories = require('./public/categories.json'),
    tableJs = require('./public/spazaData.json'),
    name = require('./public/regularSales.json'),
    mostSellingCategory = require('./public/mostSellingCategory.json'),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    products = require('./routes/products'),
    orders = require('./routes/orders'),
    categories = require('./routes/categories'),
    purchases = require('./routes/purchases'),
    sales = require('./routes/sales'),
    suppliers = require('./routes/suppliers'),
    users = require('./routes/users'),
    login = require('./routes/login'),
    bcrypt = require('bcrypt'),
    myConnection = require('express-myconnection'),
    dbOptions = {
        host: 'localhost',
        user: 'root',
        password: 'spot',
        port: 3306,
        database: 'spaza'
};
//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('views'));
app.use(express.static('public'));
app.use(session({
    secret: 'whatlskhflha',
    saveUninitialized: false,
    resave: false
}));
app.post('/signup', login.signups);
app.get(['/', '/login'], function(req, res) {
    res.render('login', {
        layout: false
    });
});
app.post("/login", login.logins);
app.post('/logout', login.logouts);
//===========hide url
app.use('/users', users.usersMiddle);
app.use(users.checkUser);

app.get('/home', function(req, res) {
    res.render('home', {
        totalSales: totalSales,
        username: username2
    });
});
app.get('/totalSales', function(req, res) {
    res.render('totalSales', {
        totalSales: totalSales
    });
});
//=======products
app.get('/products', products.show);
app.post('/product', products.addProd);
app.post('/product/updateProd/:id', products.updateProd);
app.post('/product/deleteProd/:id', products.deleteProd);
app.get('/product/:searchQuery', products.search);


//===========users
app.get('/users', users.showUsers);
app.post('/Admin/:id', users.Admin);
app.post('/notAdmin/:id', users.notAdmin);
//=======================================
//actions for Categories
app.get('/CatList', categories.showCatList);
app.post('/cat', categories.addCat);
app.post('/cat/updateCat/:id', categories.updateCat);
app.post('/cat/deleteCat/:id', categories.deleteCat);
app.get('/categories', categories.categories);
//========================================
//actions for Suppliers
app.get('/supplier', suppliers.suppliers);
app.post('/supply', suppliers.addSupplier);
app.post('/supply/deleteSupplier/:id', suppliers.deleteSupplier);
//=========================================
//actions for purchases
app.get('/purchasesList', purchases.purchases);
app.post('/purchase', purchases.addPurchase);
app.post('/purchase/deletePurchase/:id', purchases.deletePurchase);
//===========================================
//actions for Sales
app.get('/spazaData', sales.sales);
app.post('/sale', sales.addSale);
app.post('/sale/deleteSale/:id', sales.deleteSale);
app.get('/sales/:searchQuery', sales.searchSales);
app.get('/mostSellingCategory', categories.mostSellingCategory);
app.get('/regularSales', sales.regularSales);
//boot server
var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    var host = server.address().address
    var port = server.address().port
    console.log('doing my thing at http://localhost:3000/');
});
