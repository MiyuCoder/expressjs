// Require Modules
const express = require('express');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user.route');

// Set port has value 5000
const port = 5000;

const app = express();

// Using Template Engine
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route('/')
app.route('/')
    .get((req, res) => {
        res.render('index', {
            name: 'Phan Quoc Trung'
        });
    });

// Route('/users/...') Use user.route.js and Route start '/users/..'
app.route('/users')
    .use(userRoute);

app.listen(port, function() {
	console.log('Server listening on port' + port);
});

