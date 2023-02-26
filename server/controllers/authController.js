const signup_get = (req, res) => {
    res.send('signup');
}

const login_get = (req, res) => {
    res.send('login');
}

const signup_post = (req, res) => {
    res.send('signup post');
}

const login_post = (req, res) => {
    res.send('login post');
}

module.exports = { signup_get, login_get, signup_post, login_post };