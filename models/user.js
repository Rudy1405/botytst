var mongoose = require("mongoose"); /// require***
var Schema= mongoose.Schema; /// obj schema **
mongoose.Promise = global.Promise; // promise para el save  *******
mongoose.connect("mongodb://heroku_s7013vzq:lhb9mob3k2f2a44jrc7pn0j68e@ds047095.mlab.com:47095/heroku_s7013vzq"); /// ahi va la dir y el nombre ***
/*

String, numer,date, buffer, boolean, mixed, objectid, array

/// colleccions == tablas
//// Documentos == filas

*/

var user_schema= new Schema({
    fb_id: String,
    sex: String,
    age: String,
    resultado: Number,
    NoQuest: Number
   // add respuestas
   // posible add preguntas  
}); // se le pasa el json qeu va a definir como sera el documento***


var User= mongoose.model("User", user_schema)// Constructor para crear el modelo User crearia o buscaria una tabla/coleccion Users

module.exports.User= User; /// nombre con el que se podra exportar el modelo bd


/// Giphy key dd29946affa84c4786fe30095a0c3711