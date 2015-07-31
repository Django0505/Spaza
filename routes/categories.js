var mysql = require('mysql');
var CatConnections = require('./CatConnections');
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



// Show categories
exports.showCatList = function(req, res, next) {

  catConnections.showCategories(function(err, results, fields) {
            if (err) return next(err);
            var Admin = false;
            if (req.session.role == "Admin")
                Admin = true
            res.render('CatList', {
                categories: results,
                Admin: Admin,
                msg: "You don't have enough priviledges to view this page!"

            });
        });

};

//==Adding category== 
exports.addCat = function(req, res, next) {


        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            category_name: input.category_name
        };
       catConnections.insertCategory(data,function(err, results) {
            if (err)
                return console.log("Error inserting : %s ", err);

            res.redirect('/CatList');
        });

};

//==deleting a category==
exports.deleteCat = function(req, res, next) {
    var id = req.params.id;
    catConnections.deletingCategory([id],function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
            }
            res.redirect('/CatList');
        });

};


//==updating a category ==
exports.updateCat = function(req, res, next) {

    var data = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    catConnections.updatingCategory([data,id],function(err, rows) {
            if (err) {
                console.log("Error Updating : %s ", err);
            }
            res.redirect('/CatList');
        });

};


exports.mostSellingCategory = function(req, res) {
    res.render('mostSellingCategory', {
        mostSellingCategory: mostSellingCategory,
        role: req.session.role,
        msg: "You do not have permission to view this page!"
    });
}

exports.categories = function(req, res) {
    res.render('categories', {
        categories: categories,
        role: req.session.role,
        msg: "You do not have permission to view this page!"
    });
}




