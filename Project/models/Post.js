//Config Model

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
    tittle:{
        type: String,
        required: false
    },

    slug: {
        type: String,
        required: false
    },

    description: {
        type: String,
        required: false
    },

    content: {
        type: String,
        required: false
    },
    
    category: [{ 
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: false 
    }],

    date: {
        type: Date,
        default: Date.now() // Se o a opcão anterior não for adicionada, o default ira ser colocado
    }
});

mongoose.model("posts", Post); 

module.exports = {posts: Post}
