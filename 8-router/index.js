var express = require('express');
var bodyParser = require('body-parser');

var userRoute = require('./routes/user.route');

var port = 5000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.render('index', {
		name: 'Phan Quoc Trung'
	});
});

app.use('/users', userRoute);

app.listen(port, function() {
	console.log('Server listening on port ' + port);
});

