var express = require('express');
var app = express();

var port = 5000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/users', function(req, res) {
	res.send('users list');
})

app.listen(port, function() {
	console.log('Server listening on port' + port);
});

