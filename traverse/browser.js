var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
//var total= require("./public/total.json");
 
var app = express();
 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('views'));
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index');
});

/*
app.get('/why', function (req, res) {
    res.render('why', {products: total});
})
*/



app.listen(8080);
console.log( 'Express started on http://localhost:8080')
