var mysql = require('mysql');
var SupplierConnections = require('./SupplierConnections');
var connection =  mysql.createConnection({
 host: 'localhost',
        user: 'root',
        password: 'spot',
        port: 3306,
        database: 'spaza'
});

connection.connect();
//connection.query('use spaza');
var supplierConnections = new SupplierConnections(connection);







// Show suppliers
exports.suppliers = function(req, res, next) {

    supplierConnections.showSuppliers(function(err, supp) {
            if (err) return next(err);
            var Admin = false;
            if (req.session.role == "Admin")
                Admin = true;

            res.render('supplier', {
                suppliers: supp
            });
        });


}



//==Adding supplier==
exports.addSupplier = function(req, res, next) {


        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            supplier_name: input.supplier_name
        };
       supplierConnections.insertSupplier(data, function(err, results) {
            if (err)
                return console.log("Error inserting : %s ", err);

            res.redirect('/supplier')
        });


}

//== deleting a supplier==
exports.deleteSupplier = function(req, res, next) {
    var id = req.params.id;
            supplierConnections.deletingSupplier([id], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
            }
            res.redirect('/supplier');
        });


};
