// Show categories
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




