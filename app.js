// var express = require('express');
// var exphbs = require('express-handlebars');
// var app = express();
// app.engine('handlebars', exphbs({
//     defaultLayout: 'main'
// }));

//some useless comments

// app.set('view engine', 'handlebars');
// app.use(express.static('views'));

// app.get('/', function(req, res) {
//     res.render('index');
// });


// app.listen(3000);
// console.log('doing my thing at http://3000');

// cmd shift r hard refresh



//var appSpaza = angular.module("Spaza", []);

var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
//==express session
var session = require('express-session');
//
//var passport            = require('./auth');

var totalSales = require('./public/totalSold');
var categories = require('./public/categories.json');
var tableJs = require('./public/spazaData.json');
var name = require('./public/regularSales.json');
var mostSellingCategory = require('./public/mostSellingCategory.json');
//var mostRegularSales = ;

var mysql = require('mysql'),
    bodyParser = require('body-parser'),
    products = require('./routes/products'),
    orders = require('./routes/orders'),
    bcrypt = require('bcrypt');

var myConnection = require('express-myconnection');

var dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'spot',
    port: 3306,
    database: 'spaza'
};
//==== user object for session login
// var user = {
//   username:'',
//      password:''
// };
//=================================

admin = 1;




//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
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
//    passport.authenticate('local', {
//      failureRedirect: '/login',
//      successRedirect: '/user'
//    });

// });
// app.get('/user', routes.user ) {

//     res.render('login', {layout: false});
// };
app.use(session({
    secret: 'whatlskhflha',
    saveUninitialized: false,
    resave: false

}));

//======
// var userName = req.body.userName;
// var password = req.body.password;

// var user = {
//   userName: "Mawas",
//   password: "nkunzi"
// }

//var checkUser = 


// app.get('/users', checkUser, function(req, res){
//   var userData = userService.getUserData();
//   res.render('users', userData)
// });



//=======

app.post('/signup', function(req, res, next) {
    //=====session get username and password
    // user.username = req.body.username;
    // user.password = req.body.password;

    //session store
    req.getConnection(function(err, connection) {
        if (err) {
            return next(err);
        }

        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            username: input.username,
            password: input.password,
            role: 3

        };

        //bcrypt the password===
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(input.password, salt, function(err, hash) {
                // Store hash in your password DB. 
                data.password = hash;
                connection.query('insert into users set ?', data, function(err, results) {
                    if (err)
                        console.log("Error inserting : %s ", err);

                    res.render('home', {
                        msg: "Successfully signed up"
                    });
                });
            });
        });


        //================

        // connection.query('insert into users set ?', data, function(err, results) {
        //     if (err)
        //         return console.log("Error inserting : %s ", err);

        //     //res.redirect('/purchasesList')
        //     res.redirect('/login');
        // });
    });



    //console.log(user);
    //res.redirect('/login');
    //req.session.user = user;

});
app.get(['/', '/login'], function(req, res) {
    res.render('login', {
        layout: false
    });
});


app.post("/login", function(req, res, next) {
    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function(err, connection) {
        if (err)
            return next(err);

        connection.query('SELECT * from users WHERE username=?', [input.username], function(err, user) {
            if (user.length == 0) {
                console.log("User doesn't exist!");
                return res.redirect("/login")
            }
            bcrypt.compare(input.password, user[0].password, function(err, pass) {
            console.log(user)
            
                if (err) {
                    console.log(err)
                }
                var User = function(userDetails){
                    ///????
                    this.userName = userDetails.name;
                    //
                    this.isAdmin = function(){
                        // check based on user details
                        return true;
                    }
                }    
                if (pass) {
                    req.session.user = new User(input);
                    return res.redirect("/home")
                } else {
                    return res.render('login', {
                        layout: false,
                        msg: "Wrong password or Invalid username"
                    });
                    // res.redirect("/login")
                }
            })
        })
    })
})



app.post('/logout', function(req, res, next) {

    var msg = "logging out : " + req.session.user;

    delete req.session.user
    console.log(msg);
    return res.redirect('login');
    //res.redirect("/bye")

    //res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
});
//==========logout brute

// function logout(){
//     var msg = "logging out : " + req.session.userName;
//     delete req.session.user
//     res.redirect('login',{ msg:msg});

// }

//==========
app.use(function(req, res, next) {
    if (req.session.user) {
        return next();
    }
    // the user is not logged in redirect him to the login page
    res.redirect('login');
});
//===========
app.get('/home', function(req, res) {

    res.render('home', {
        totalSales: totalSales
    });
});
app.get('/totalSales', function(req, res) {

    res.render('totalSales', {
        totalSales: totalSales
    });
});
app.get('/products', products.show);
app.post('/product', products.addProd);
app.post('/product/updateProd/:id', products.updateProd);
app.post('/product/deleteProd/:id', products.deleteProd);
app.get('/regularSales', function(req, res) {

    res.render('regularSales', {
        regularSales: name
    });
});
app.get('/categories', function(req, res) {

    //var categories = yourModuleThatProcessTheData.getCategories();

    res.render('categories', {
        categories: categories
    });
});
//=======================================
//actions for Categories

app.get('/CatList', products.showCatList);
app.post('/cat', products.addCat);
app.post('/cat/updateCat/:id', products.updateCat);
app.post('/cat/deleteCat/:id', products.deleteCat);

//========================================
//actions for Suppliers

app.get('/supplier', products.suppliers);
app.post('/supply', products.addSupplier);
app.post('/supply/deleteSupplier/:id', products.deleteSupplier);
//=========================================
//actions for purchases
app.get('/purchasesList', products.purchases);

app.get('/purchasesList', products.suppliers);
app.get('/products', products.show);
app.post('/purchase', products.addPurchase);
app.post('/purchase/deletePurchase/:id', products.deletePurchase);

//===========================================
//actions for Sales
app.get('/spazaData', products.sales);

app.get('/spazaData', products.suppliers);
app.get('/products', products.show);
app.post('/sale', products.addSale);
app.post('/sale/deleteSale/:id', products.deleteSale);


app.get('/mostSellingCategory', function(req, res) {

    //var mostSellingCategory = yourModuleThatProcessTheData.getCategories();

    res.render('mostSellingCategory', {
        mostSellingCategory: mostSellingCategory
    });
});

// app.get('/*', function(req, res) {

//     res.render('error', {layout: false});
// });




var port = process.env.PORT || 3000;
var server = app.listen(port, function() {

    var host = server.address().address
    var port = server.address().port

    console.log('doing my thing at http://localhost:3000/');
});




// ALTER TABLE users
// ADD role int
// INSERT INTO users (userID, username, password, role)
// VALUES (21,'Nelisa','pass',1);
// update  users (userID, username, password, role)
// VALUES (21,'Nelisa','pass',1);
// UPDATE users
// SET role=1
// WHERE userID=22;




// CREATE TABLE users
// (
// userID int auto_increment primary key,
// username varchar(255),
// password varchar(255)

// );







// DELIMITER $$
// CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_createUser`(
//     IN username VARCHAR(30),
//     IN password TEXT(255)
// )
// BEGIN
//     if ( select exists (select 1 from users where username = username) ) THEN

//         select 'Username Exists !!';

//     ELSE

//         insert into users
//         (

//             username,
//             password
//         )
//         values
//         (

//             input.username,
//             input.password
//         );

//     END IF;
// END$$
// DELIMITER ;


