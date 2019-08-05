//Salvar dados de html no DB.

const Post = require("../models/Post");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/cad", function(req, res){
    res.sendFile('/home/bortolossohurst/Documents/NodeJS/html/index.html')
});

app.post("/rota", function(req, res){
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        res.send("Dados salvos !");
        console.log("Dados salvos com sucesso !");
    });
});

app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081")
});