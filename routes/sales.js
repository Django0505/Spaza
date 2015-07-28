//==============searchSales
exports.searchSales = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err)
            return next(err);
        var searchQuery = req.params.searchQuery;
        searchQuery = "%" + searchQuery + "%";
        console.log(searchQuery);
        //if (searchQuery === 'all') {
            connection.query('SELECT * from purchase_table where stock_item LIKE ?', searchQuery, function(err, results) {
                if (err)
                    return next(err);
                var Admin = false;
                if (req.session.role == "Admin")
                    Admin = true
                res.render('sales', {
                    purchase_table: results,
                    Admin: Admin,
                    msg: "You don't have enough priviledges use search!",
                    layout: false
                    
                });
            });
    });
};





//show sales


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

exports.regularSales =function(req, res) {
    res.render('regularSales', {
        regularSales: name,
        Admin: req.session.role,
        msg: "You do not have permission to view this page!"
    });
}

