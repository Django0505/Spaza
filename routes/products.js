/***
 * A very basic CRUD example using MySQL
 */

//todo - fix the error handling


//=======search

exports.search = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err)
                return next(err);
        var searchQuery = req.params.searchQuery;
        searchQuery = "%" + searchQuery + "%";
        console.log(searchQuery);
        connection.query("SELECT * from products where product_name LIKE ?",searchQuery, function(err, results){
            if (err) return next(err);
              var Admin = false;
            if (req.session.role == "Admin")
                Admin = true
            res.render('searchResults', {
                products: results,
                Admin: Admin,
                msg: "You don't have enough priviledges to view this page!"
                //layout: false

            });
        });
    });
};




//=========users
exports.showUsers = function(req, res, next) {

    req.getConnection(function(err, connection) {
        if (err)
            return next(err);
        connection.query('SELECT * from users', [], function(err, results, fields) {
            if (err) return next(err);
            var Admin = false;
            if (req.session.role == "Admin")
                Admin = true
            res.render('users', {
                users: results,
                Admin: Admin,
                msg: "You don't have enough priviledges to view this page!"

            });
        });
    });
};







//
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

exports.showCatList = function(req, res, next) {

    req.getConnection(function(err, connection) {
        if (err)
            return next(err);
        connection.query('SELECT * from categories', [], function(err, results, fields) {
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
    });
};


exports.suppliers = function(req, res, next) {

    req.getConnection(function(err, connection) {
        if (err)
            return next(err);
        connection.query('SELECT * FROM suppliers', [], function(err, supp) {
            if (err) return next(err);
            var Admin = false;
            if (req.session.role == "Admin")
                Admin = true

            res.render('supplier', {
                suppliers: supp
            });
        });
    });

}
exports.purchases = function(req, res, next) {

    req.getConnection(function(err, connection) {
        if (err)
            return next(err);
        connection.query('SELECT * FROM orders_table', [], function(err, results) {
            if (err) return next(err);
            var Admin = false;
            if (req.session.role == "Admin")
                Admin = true

            res.render('purchasesList', {
                orders_table: results
            });
        });
    });

}

exports.sales = function(req, res, next) {

    req.getConnection(function(err, connection) {
        if (err)
            return next(err);
        connection.query('SELECT * FROM purchase_table', [], function(err, results) {
            if (err) return next(err);
            var Admin = false;
            if (req.session.role == "Admin")
                Admin = true

            res.render('spazaData', {
                purchase_table: results
            });
        });
    });

}

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
//=========================ADD====================

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
//==Adding category== 
exports.addCat = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) {
            return next(err);
        }

        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            category_name: input.category_name
        };
        connection.query('insert into categories set ?', data, function(err, results) {
            if (err)
                return console.log("Error inserting : %s ", err);

            res.redirect('/CatList')
        });
    });

}

//==Adding supplier==
exports.addSupplier = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) {
            return next(err);
        }

        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            supplier_name: input.supplier_name
        };
        connection.query('insert into suppliers set ?', data, function(err, results) {
            if (err)
                return console.log("Error inserting : %s ", err);

            res.redirect('/supplier')
        });
    });

}

//==Adding a Sale==
exports.addSale = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) {
            return next(err);
        }

        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            day: input.day,
            on_date: input.on_date,
            quantity: input.quantity,
            sale_price: input.sale_price
        };
        connection.query('insert into sales set sales.product_id = (SELECT product_id FROM products WHERE product_name = ?),?', [input.product_name, data], function(err, results) {
            if (err)
                return console.log("Error inserting : %s ", err);

            res.redirect('/spazaData')
        });
    });

}
//==Adding a purchase==
exports.addPurchase = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) {
            return next(err);
        }

        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            shop: input.shop,
            date: input.date,
            item: input.item,
            quantity: input.quantity,
            cost: input.cost
        };
        connection.query('insert into orders_table set ?,total_cost = quantity * cost', data, function(err, results) {
            if (err)
                return console.log("Error inserting : %s ", err);

            res.redirect('/purchasesList')
        });
    });

}
//=============================DELETE======================

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

//==deleting a category==
exports.deleteCat = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('DELETE FROM categories WHERE category_id = ?', [id], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
            }
            res.redirect('/CatList');
        });
    });
};




//== deleting a supplier==
exports.deleteSupplier = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {

        connection.query('DELETE FROM suppliers WHERE supplier_id = ?', [id], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
            }
            res.redirect('/supplier');
        });

    });
};

//==deleting a sale==
exports.deleteSale = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {

        connection.query('DELETE FROM categories WHERE id = ?', [id], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
            }
            res.redirect('/CatList');
        });

    });
};

//==deleting a purchase==
exports.deletePurchase = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {

        connection.query('DELETE FROM orders_table WHERE purchase_id = ?', [id], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
            }
            res.redirect('/purchasesList');
        });

    });
};

//=======================UPDATES==========================================

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

//==updating a category ==
exports.updateCat = function(req, res, next) {

    var data = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('UPDATE categories SET ? WHERE category_id = ?', [data, id], function(err, rows) {
            if (err) {
                console.log("Error Updating : %s ", err);
            }
            res.redirect('/CatList');
        });

    });
};


//==updating a user==
exports.Admin = function(req, res, next) {

    var data = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('UPDATE users SET role = "Admin" WHERE userID = ?',id, function(err, rows) {
            if (err) {
                console.log("Error Updating : %s ", err);
            }
            res.redirect('/users');
        });

    });
};
exports.notAdmin = function(req, res, next) {

    var data = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('UPDATE users SET role = "notAdmin" WHERE userID = ?',id, function(err, rows) {
            if (err) {
                console.log("Error Updating : %s ", err);
            }
            res.redirect('/users');
        });

    });
};
//**************


//== updating a sale ==
exports.updateSale = function(req, res, next) {

    var data = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('UPDATE products SET ? WHERE id = ?', [data, id], function(err, rows) {
            if (err) {
                console.log("Error Updating : %s ", err);
            }
            res.redirect('/products');
        });

    });
};

//==updating a purchase==
exports.updatePurchse = function(req, res, next) {

    var data = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('UPDATE products SET ? WHERE id = ?', [data, id], function(err, rows) {
            if (err) {
                console.log("Error Updating : %s ", err);
            }
            res.redirect('/products');
        });

    });
};

//

// exports.show = function (req, res, next) {
//  req.getConnection(function(err, connection){
//    if (err) 
//      return next(err);
//    connection.query('SELECT * from products', [], function(err, results) {
//          if (err) return next(err);

//        res.render( 'home', {
//          products : results
//        });
//       });
//  });
// };

// exports.get = function(req, res, next){
//  var id = req.params.id;
//  req.getConnection(function(err, connection){
//    connection.query('SELECT * FROM products WHERE id = ?', [id], function(err,rows){
//      if(err){
//            console.log("Error Selecting : %s ",err );
//      }
//      res.render('edit',{page_title:"Edit Customers - Node.js", data : rows[0]});      
//    }); 
//  });
// };

// exports.update = function(req, res, next){

//  var data = JSON.parse(JSON.stringify(req.body));
//      var id = req.params.id;
//      req.getConnection(function(err, connection){
//        connection.query('UPDATE products SET ? WHERE id = ?', [data, id], function(err, rows){
//          if (err){
//                    console.log("Error Updating : %s ",err );
//          }
//              res.redirect('/products');
//        });

//     });
// };
