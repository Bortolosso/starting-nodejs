const mongoose = require("mongoose");

//Se conectando ao MONGOOSE_DB
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/mongo_em_node", {
    useNewUrlParser: true
}).then(() => {
    console.log("MongoDB conectado !");
}).catch((err) => {
    console.log("Houve um erro ao se conectar ao banco de dados(MongoDB): " + err);
});

// Model - Usúarios | Definindo Model

const UserSchem = mongoose.Schema({
    nome : {
        type: String, 
        require: true //Se o campo vai ser obrigatorio
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    },
    pais: {
        type: String,
        require: false
    }
});

// Collection
mongoose.model("Usuarios", UserSchem);

const User = mongoose.model("Usuarios");

new User({
    nome: "Danie",
    sobrenome: "Santana",
    email: "danielsantana@mail.com",
    idade: 19,
    pais: "Brasil"
}).save().then(() =>{
    console.log("Usuario salvo com sucesso !");
}).catch((err) => {
    console.log("Houve um erro ao salvar o usuario !" + err);
});