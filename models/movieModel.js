const mongoose = require('mongoose');

const movieSchemma = mongoose.Schema
(
    {
        "name":{
            type: String,
            required: true
        },
        "category": {
            type: String, //ver la posibilidad de enumerar generos
            required: true
        },
        "image": {
            type: String,

        },
        "type": {
            type:  String,
            enum : ['serie','movie'],
            default: 'movie'
        }
    }
)

module.exports = mongoose.model("Movie", movieSchemma);
