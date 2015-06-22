var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
 
var app = express()
 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
 
app.use(function (req, res, next) {
  var views = req.session.views
 
  if (!views) {
    views = req.session.views = {}
  }
 
  // get the url pathname 
  var pathname = parseurl(req).pathname
 
  // count the views 
  views[pathname] = (views[pathname] || 0) + 1
 
  next()
})
 
app.get('/login/:user', function (req, res, next) {

  var user = req.params.user;

  if(user == "spot" || "mawas"){
    req.session.user = req.params.user;
    return res.redirect("/hello")
  }

  res.send("invalid username!")
  //res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
});

app.get('/logout', function (req, res, next) {

  var msg = "logging out : " + req.session.user;
  delete req.session.user
  res.send(msg);

  //res.redirect("/bye")

  //res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
});

app.get("/bye", function(req, res){
  res.send("bye - you are not logged in!")
});

var loggedIn = function(req, res, next){
  if (req.session.user)
    return next();
  else
    res.redirect("/bye");
};

app.get("/hello", loggedIn, function(req, res){
  res.send("hello you are logged in : " + req.session.user)
})

app.get("/hello2", loggedIn, function(req, res){
  res.send("hello2 you are logged in : " + req.session.user)
})

app.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

app.listen("3001")