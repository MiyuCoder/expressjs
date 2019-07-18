// req.query
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var authMiddleware = require('./middleware/auth.middleware');

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

// using cookie-parser
app.use(cookieParser());

app.use(express.static('public'));

// Routes
app.get('/', authMiddleware.requireAuth, function (req, res) {
    res.render('index', {
        name: 'Phan Quoc Trung'
    });
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});