const mongoose = require('mongoose');

const userSchemma = mongoose.Schema
(
    {
        "name": {
            type: String,
            required: true
        },
        "password": {
            type: String,
            required: true
        },
        "isAdmin": {
            type: Boolean,
            default: false
        }
    }
);

module.exports = mongoose.model("User", userSchemma);