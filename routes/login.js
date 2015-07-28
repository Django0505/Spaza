exports.logins = function(req, res, next) {
    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function(err, connection) {
        if (err)
            return next(err);

        connection.query('SELECT * from users WHERE username=?', [input.username], function(err, user) {
            if (user.length == 0) {
                console.log("User doesn't exist!");
                return res.redirect("/login")
            }
            bcrypt.compare(input.password, user[0].password, function(err, pass) {
                console.log('logged in as', user)

                if (err) {
                    console.log(err)
                }

                if (pass) {
                    req.session.user = input.username;
                    req.session.role = user[0].role;
                    username2 = req.session.user;
                    console.log(req.session.role, "<==========")
                    console.log(username2);
                    return res.redirect("/home")
                } else {
                    return res.render('login', {
                        layout: false,
                        msg: "Wrong password or Invalid username"
                    });
                }
            })
        })
    })
}




exports.signups = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) {
            return next(err);
        }
        var input = JSON.parse(JSON.stringify(req.body));
        console.log(input);
        var data = {
            username: input.username,
            password: input.password[0],
            role: 'notAdmin'
        };
        //bcrypt the password===
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(data.password, salt, function(err, hash) {
                // Store hash in your password DB. 
                data.password = hash;
                connection.query('insert into users set ?', data, function(err, results) {
                    if (err)
                        console.log("Error inserting : %s ", err);

                    res.render('login', {
                        msg: "Successfully signed up",

                        layout: false
                    });
                });
            });
        });
    });
};

exports.logouts = function(req, res, next) {

    var msg = "logging out : " + req.session.user;

    delete req.session.user
    console.log(msg);
    return res.redirect('login');
};

exports.root = function(req, res) {
    res.render('login', {
        layout: false
    });
}











