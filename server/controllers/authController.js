const User = require('../models/User');

// handle errors
const handleError = (err) => {
    console.log(err.message, err.code);
    let errors = { firstName: '', lastName: '', email: '', password: '' };

    // duplicate error code
    if (err.code === 11000) {
        errors.email = "The email is already registered";
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

const handleLoginError = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // incorrect email
    if (err.message === 'Incorrect email') {
        errors.email = 'That email is not registered';
    }

    // incorrect password
    if (err.message === 'Incorrect password') {
        errors.password = 'That password is incorrect';
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

// HTTP request handler
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
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
    }
}

const login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleLoginError(err);
        res.status(400).json({ errors });
    }
}

module.exports = { signup_get, login_get, signup_post, login_post };