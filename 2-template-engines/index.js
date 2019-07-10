var express = require('express');
var app = express();

var port = 5000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function(req, res) {
	res.render('index', {
		name: 'Phan Quoc Trung'
	});
});

app.get('/users', function(req, res) {
	res.render('users/index', {
		users: [
			{ id: 1, name: 'Trung' },
			{ id: 2, name: 'Thinh' },
		]
	});
})

app.listen(port, function() {
	console.log('Server listening on port' + port);
});

