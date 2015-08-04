
var mysql = require('mysql');
var PurchaseConnections = require('./PurchaseConnections');
var connection =  mysql.createConnection({
 host: 'localhost',
        user: 'root',
        password: 'spot',
        port: 3306,
        database: 'spaza'
});

connection.connect();
//connection.query('use spaza');
var purchaseConnections = new PurchaseConnections(connection);





// show purchases
exports.purchases = function(req, res, next) {

    purchaseConnections.showPurchases(function(err, results) {
            if (err) return next(err);
            var Admin = false;
            if (req.session.role == "Admin")
                Admin = true

            res.render('purchasesList', {
                orders_table: results
            });
        });


}



//==Adding a purchase==
exports.addPurchase = function(req, res, next) {

        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            shop: input.shop,
            date: input.date,
            item: input.item,
            quantity: input.quantity,
            cost: input.cost
        };
        purchaseConnections.insertPurchase(data, function(err, results) {
            if (err)
                return console.log("Error inserting : %s ", err);

            res.redirect('/purchasesList')
        });

}
//==deleting a purchase==
exports.deletePurchase = function(req, res, next) {
    var id = req.params.id;
    purchaseConnections.deletingPurchase([id], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
            }
            res.redirect('/purchasesList');
        });
};
//==updating a purchase==
exports.updatePurchase = function(req, res, next) {

    var data = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    purchaseConnections.updatingPurchase([data, id], function(err, rows) {
            if (err) {
                console.log("Error Updating : %s ", err);
            }
            res.redirect('/products');
        });

};
