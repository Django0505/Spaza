// show purchases
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
//==updating a purchase==
exports.updatePurchase = function(req, res, next) {

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