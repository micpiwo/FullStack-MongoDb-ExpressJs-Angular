const mongoose = require('mongoose');

const usersShema = mongoose.Schema({
       name: String,
       age: String,
       town: String,
       compagny: String

});

const Users = module.exports = mongoose.model('users', usersShema, 'users');