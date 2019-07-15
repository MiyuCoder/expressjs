// Require Modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const shortid = require('shortid');
const db = low(adapter);

// Set port has value 5000
var port = 5000;

// Using Template Engine
app.set('view engine', 'pug');
app.set('views', './views');

// Set default User 
db.defaults({ users: [] })
  .write();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route('/')
app.route('/')
    .get((req, res) => {
        res.render('index', {
            name: 'Phan Quoc Trung'
        });
    })

// Route('/users/)
app.route('/users')
    .get((req, res) => {
        res.render('users/index', {
            users: db.get('users').value()
        });
    })

// Route('/users/search/)
app.route('/users/search')
    .get((req, res) => {
        let q = req.query.q;
        let matchedUsers = db.get('users').value().filter(user => {
            return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
        
        res.render('users/index', {
            users: matchedUsers
        });
    })

// Route('/users/create')
app.route('/users/create')
    .get((req, res) => {
        res.render('users/create');
    })
    .post((req, res) => {
        req.body.id = shortid.generate();
        db.get('users').push(req.body).write();
        res.redirect('/users');
    })

// Route('/users/:id')
app.route('/users/:id')
    .get((req, res) => {
        let id = req.params.id;

        let user = db.get('users').find({ id: id }).value();

        res.render('users/view', {
            user: user
        });
    })

app.listen(port, function() {
	console.log('Server listening on port' + port);
});

