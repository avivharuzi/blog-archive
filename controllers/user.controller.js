const User = require('./../models/user.model');

const ValidationHandler = require('./../handlers/validation.handler');
const FileHandler = require('./../handlers/file.handler');
const AwsHandler = require('./../handlers/aws.handler');

class UserController {
    static saveUser(user) {
        return new Promise((resolve, reject) => {
            User.create({
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                password: user.password,
                profileImage: user.profileImage
            }, (err, newUser) => {
                if (err) {
                    reject(['There was problem by saving this user']);
                } else {
                    resolve(newUser);
                }
            });
        });
    }

    static validateUser(user, files) {
        return new Promise((resolve, reject) => {
            let errors = [];

            if (files && files.profileImage) {
                user.profileImage = files.profileImage
            }

            if (ValidationHandler.regex(user.username, /^[A-Za-z0-9_]{3,55}$/)) {
                user.username = ValidationHandler.testInput(user.username);
            } else {
                errors.push('Username is invalid');
            }
    
            if (ValidationHandler.regex(user.firstname, /^[A-Za-z]{2,55}$/)) {
                user.firstname = ValidationHandler.testInput(user.firstname);
            } else {
                errors.push('Firstname is invalid');
            }
    
            if (ValidationHandler.regex(user.lastname, /^[A-Za-z]{2,55}$/)) {
                user.lastname = ValidationHandler.testInput(user.lastname);
            } else {
                errors.push('Lastname is invalid');
            }
    
            if (ValidationHandler.regex(user.password, /^[A-Za-z0-9!@#$%^&*()_]{3,55}$/)) {
                user.password = ValidationHandler.testInput(user.password);
            } else {
                errors.push('Password is invalid');
            }
    
            if (errors.length) {
                reject(errors);
            } else {
                UserController.checkUserByUsername(user)
                    .then(() => resolve(user))
                    .catch((err) => reject(err));
            }
        });
    }

    static validateProfileImageAndUpload(user) {
        return new Promise((resolve, reject) => {
            if (user.profileImage) {
                FileHandler.checkFilesErrors(user.profileImage, 'image', 2)
                    .then(AwsHandler.uploadFileToS3)
                    .then((profileImageName) => {
                        user.profileImage = profileImageName;
                        resolve(user);
                    })
                    .catch((err) =>  reject(err));
            } else {
                user.profileImage = process.env.DEFAULT_PROFILE_IMAGE;
                resolve(user);
            }
        });
    }

    static checkUserByUsername(user) {
        return new Promise((resolve, reject) => {
            User.findOne({
                username: user.username.toLowerCase()
            }).exec((err, userExist) => {
                if (err) {
                    reject(['There was problem to find the user']);
                } else if (userExist) {
                    reject(['This username is already in used']);
                } else {
                    resolve();
                }
            });
        });
    }

    static checkUserForLogin(user) {
        return new Promise((resolve, reject) => {
            User.findOne({
                username: user.username.toLowerCase()
            }, (err, userExist) => {
                if (err) {
                    reject(err);
                } else if (userExist) {
                    userExist.comparePassword(user.password, (error, isMatch) => {
                        if (error) {
                            reject(error);
                        } else if (isMatch) {
                            resolve(userExist);
                        }
                        reject(['The username or password you have entered is invalid']);
                    });
                } else {
                    reject(['The username or password you have entered is invalid']);
                }
            });
        });
    }

    static checkUserForAuthAndGetUser(user) {
        return new Promise((resolve, reject) => {
            User.findOne({
                username: user.username.toLowerCase(),
                password: user.password
            }, (err, userExist) => {
                if (err) {
                    reject();
                } else if (userExist) {
                    resolve(userExist);
                } else {
                    reject();
                }
            });
        });
    }
}

module.exports = UserController;
