const express = require('express');
const app = express();
const port = 3000;

// using template engines
app.set('view engine', 'pug');
app.set('views', './views');

let users = [
    {
        id: 1, name: 'Trung',
    }, {
        id: 2, name: 'Vuong'
    }, {
        id: 3, name: 'Doanh'
    }
];

app.route('/')
    .get((req, res) => {
        res.render('index');
    }); 

app.route('/user')
    .get((req, res) => {
        res.render('users/user', {
            users: users
        });
    });

app.route('/layout')
    .get((req, res) => {
        res.render('users/layout');
    });

app.route('/user/search')
    .get((req, res) => {
        let q = req.query.q;

        var matchedUsers = users.filter(user => {
            return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });

        res.render('users/user', {
            users: matchedUsers
        });
    });

app.listen(port, () => {
    console.log('Server listening on port, ' + port);
});