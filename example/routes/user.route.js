// Require Modules
const express = require('express');
const shortid = require('shortid');

const db = require('../db');

const router = express.Router();

// Route('/users/)
router.route('/')
    .get((req, res) => {
        res.render('users/index', {
            users: db.get('users').value()
        });
    })

// Route('/users/search/)
router.route('/search')
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
router.route('/create')
    .get((req, res) => {
        res.render('users/create');
    })
    .post((req, res) => {
        req.body.id = shortid.generate();
        db.get('users').push(req.body).write();
        res.redirect('/users');
    })

// Route('/users/:id')
router.route('/:id')
    .get((req, res) => {
        let id = req.params.id;

        let user = db.get('users').find({ id: id }).value();

        res.render('users/view', {
            user: user
        });
    })

module.exports = router;