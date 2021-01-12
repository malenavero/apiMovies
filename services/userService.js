const User = require ('./../models/userModel');
const bcrypt = require('bcrypt');

class userService {

    getUsers(limit, offset){
        const query = User.find().exec();
        return query;
    };

    getUserById(id){
        const query = User.findById(id).exec();
        return query;
    };

    getByName(name) {
        const query = User.findOne({ name }).exec();
        return query;
    };

    checkUser(id) {
        const query = User.findById(id).exec();
        return query;
    };

    postUser(data){
        return bcrypt.hash(data.password, 10).then (hash => {
            data.password = hash;
            const newUser = new User(data);
            return newUser.save();
        });
    };

    editUser(id, data){
        const query = User.findByIdAndUpdate(id, data).exec();
        return query;
    };
    
    deleteUser(id){
        const query = User.findByIdAndDelete(id);
        return query;
    };
};

module.exports = userService;