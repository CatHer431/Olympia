const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

// static method to login user
userSchema.statics.login = async (email, password) => {
    const user = await User.findOne({ email });

    if (user) {
        const auth = (user.password === password);
        if (auth) {
            return user;
        }
        throw Error("Invalid password");
    }
    throw Error("Incorrect email");
}

const User = mongoose.model('user', userSchema);

module.exports = User;