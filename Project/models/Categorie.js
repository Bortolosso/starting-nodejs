//Config Model

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Categorie = new Schema({
    name:{
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true
    },
    
    date: {
        type: Date,
        default: Date.now() // Se o a opcão anterior não for adicionada, o default ira ser colocado
    }
});

mongoose.model("categories", Categorie); 