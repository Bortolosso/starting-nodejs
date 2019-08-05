const express = require("express");
const app = express();

//ROTAS SAO CAMINHOS PARA UMA APLICACAO 

app.get("/", function(req, res){
    res.sendFile(__dirname + "/html/index.html"); //__dirname = /home/bortolossohurst/Documents/NodeJS/ ou seja, retorna o diretorio raiz/completo/absoluto da minha aplicacao
});

app.get("/outrarota", function(req, res){
    res.sendFile(__dirname + "/html/outrarota.html");
});

app.listen(8082, function(){
    console.log("Servidor rodando na ur http://localhost:8082");
});

//app.listen sempre deve ficar por ultimo do restantes das outras rotas.