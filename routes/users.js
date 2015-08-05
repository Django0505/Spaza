//==============searchUsers
exports.searchUsers = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err)
            return next(err);
        var searchQuery = req.params.searchQuery;
        searchQuery = "%" + searchQuery + "%";
        console.log(searchQuery);
        //if (searchQuery === 'all') {
            connection.query('SELECT * from users where username =  ?', searchQuery, function(err, results) {
                if (err)
                    return next(err);
                //var Admin = false;
                console.log(results);
                //if ()
                //   Admin = true
                res.render('login', {
                    username: results,
                    //Admin: Admin,
                    msg: "You don't have enough priviledges to view this page!",
                    layout: false
                    
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

//==updating a user==
exports.Admin = function(req, res, next) {

    var data = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('UPDATE users SET role = "Admin" WHERE userID = ?', id, function(err, rows) {
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
        connection.query('UPDATE users SET role = "notAdmin" WHERE userID = ?', id, function(err, rows) {
            if (err) {
                console.log("Error Updating : %s ", err);
            }
            res.redirect('/users');
        });

    });
};
//**************


exports.usersMiddle = function(req, res, next) {
    if (req.session.user && req.session.role == 'Admin') {
        if (req.session.role == 'Admin') {
            Admin = true;
            console.log("Inside users middleware ========>", Admin);
        }
        return next();
    }
    res.redirect('home');
};

// check user role
exports.checkUser = function(req, res, next) {
    if (req.session.user) {
        if (req.session.role == 'Admin') {
            Admin = true;
            console.log("========>", Admin);
        }
        return next();
    }
    // the user is not logged in redirect him to the login page
    res.redirect('login');
};




