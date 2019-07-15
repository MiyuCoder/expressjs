const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// using body parser in req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// using lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

// using template engines
app.set('view engine', 'pug');
app.set('views', './views');

// Set defaults Users (Require if your Json file is empty
db.defaults({ users: [] })
  .write();

app.route('/')
    .get((req, res) => {
        res.render('index');
    }); 

app.route('/user')
    .get((req, res) => {
        res.render('users/user', {
            users: db.get('users').value()
        });
    });

app.route('/layout')
    .get((req, res) => {
        res.render('users/layout');
    });

app.route('/user/search')
    .get((req, res) => {
        let q = req.query.q;

        var matchedUsers = db.get('users').value().filter(user => {
            return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });

        res.render('users/user', {
            users: matchedUsers
        });
    });

app.route('/user/create')
    .get((req, res) => {
        res.render('users/create');
    })
    .post((req, res) => {
        db.get('users').push(req.body).write();
        res.redirect('/user');
    })

app.listen(port, () => {
    console.log('Server listening on port, ' + port);
});