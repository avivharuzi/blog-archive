const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        lowercase: true
    },
    lastname:  {
        type: String,
        lowercase: true
    },
    username: {
        type: String,
        lowercase: true,
        unique: true
    },
    password: String,
    profileImage: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', function (next) {
    let user = this;

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    let user = this;

    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
};

userSchema.pre('update', function () {
    this.update({}, { $set: { updatedDate: new Date() } });
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
