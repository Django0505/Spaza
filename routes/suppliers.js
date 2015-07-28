// Show suppliers
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