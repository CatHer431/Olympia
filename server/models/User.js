const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name"],
        lowercase: true
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
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