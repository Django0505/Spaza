
//=======search
exports.search = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err)
            return next(err);
        var searchQuery = req.params.searchQuery;
        searchQuery = "%" + searchQuery + "%";
        console.log(searchQuery);
        //if (searchQuery === 'all') {
            connection.query('SELECT * from products where product_name LIKE ?', searchQuery, function(err, results) {
                if (err)
                    return next(err);
                var Admin = false;
                if (req.session.role == "Admin")
                    Admin = true
                res.render('product', {
                    products: results,
                    //categories: cat,
                    Admin: Admin,
                    msg: "You don't have enough priviledges to view this page!",
                    layout: false
                    
                });
            });
    });
};

// products
exports.show = function(req, res, next) {

    req.getConnection(function(err, connection) {
        if (err)
            return next(err);
        connection.query('SELECT * from products, categories where products.category_id=categories.category_id', [], function(err, prod, fields) {
            if (err)
                return next(err);
            connection.query('SELECT * from categories', [], function(err, cat, fields) {
                if (err)
                    return next(err);
                var Admin = false;
                if (req.session.role == "Admin")
                    Admin = true
                res.render('products', {
                    products: prod,
                    categories: cat,
                    Admin: Admin,
                    msg: "You don't have enough priviledges to view this page!"
                });

            });

        });
    });
};

exports.productsAndCategories = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err)
            return next(err);
        connection.query('SELECT product_name,category_name FROM products join categories on products.category_id = categories.category_id order by category_name asc;', [], function(err, results) {
            if (err) return next(err);
            var Admin = false;
            if (req.session.role == "Admin")
                Admin = true
            res.render('productsAndCategories', {
                productsAndCategories: results
            });
        });
    });

}

exports.mostSold = function(req, res, next) {
    var fs = require('fs');
    req.getConnection(function(err, connection) {
        if (err)
            return next(err);
        connection.query('select stock_item, sum(no_sold) as sold_total from purchase_table group by stock_item order by sold_total desc;', [], function(err, results) {
            if (err) return next(err);
            fs.writeFile('fsProductsTable.json', JSON.stringify(results), function(err) {
                if (err) throw err;
                console.log('saved mostSold File!');
            })
            var Admin = false;
            if (req.session.role == "Admin")
                Admin = true
            res.render('mostSold', {
                mostSold: results
            });
        });
    });
}
// leastsold
exports.leastSold = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err)
            return next(err);
        connection.query('select stock_item, sum(no_sold) as sold_total from purchase_table group by stock_item order by sold_total asc;', [], function(err, results) {
            if (err) return next(err);
            var Admin = false;
            if (req.session.role == "Admin")
                Admin = true
            res.render('leastSold', {
                leastSold: results
            });
        });
    });
}
//==Adding product==
exports.addProd = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) {
            return next(err);
        }

        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            product_name: input.product_name,
            category_id: input.category_id
        };
        connection.query('insert into products set ?', data, function(err, results) {
            if (err)
                return console.log("Error inserting : %s ", err);
            var Admin = false;
            if (req.session.role == "Admin")
                Admin = true

            res.redirect('/products')
        });
    });

}

//==deleting a product==
exports.deleteProd = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('DELETE FROM products WHERE product_id = ?', [id], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
            }
            res.redirect('/products');
        });
    });
};

//==updating a product==
exports.updateProd = function(req, res, next) {
    var data = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    var data = {
        product_name: req.body.product_name,
        category_name: req.body.category_name
    };
    req.getConnection(function(err, connection) {
        connection.query('UPDATE products SET products.category_id = (SELECT category_id FROM categories WHERE category_name = ?) WHERE product_name = ?', [data.category_name, data.product_name], function(err, rows) {
            if (err) {
                console.log("Error Updating : %s ", err);
            }
            res.redirect('/products');
        });

    });
};
