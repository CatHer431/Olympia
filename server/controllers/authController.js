const User = require('../models/User');

const signup_get = (req, res) => {
    res.send('signup');
}

const login_get = (req, res) => {
    res.send('login');
}

const signup_post = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await User.create({ firstName, lastName, email, password });
        res.status(201).json(user);
    }
    catch (err) {
        console.log(err);
        res.status(400).send('error creating user');
    }
}

const login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = { signup_get, login_get, signup_post, login_post };