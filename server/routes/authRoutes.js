const express = require('express');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send('signup');
});

router.post('/signup', (req, res) => {
    res.send('create account');
});

router.get('/login', (req, res) => {
    res.send('login');
});

router.post('/login', (req, res) => {
    res.send('logged in');
})

module.exports = router;