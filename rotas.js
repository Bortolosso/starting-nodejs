const express = require("express");
const app = express();

//ROTAS SAO CAMINHOS PARA UMA APLICACAO 

app.get("/", function(req, res){
    res.send("ROTA PRINCIPAL !!!");
});

app.get("/outrarota", function(req, res){
    res.send("OUTRA ROTA !!!");
});

app.get("/maisoutrarota", function(req, res){
    res.send("MAIS OUTRA ROTA !!!");
});

app.listen(8081, function(){
    console.log("Servidor rodando na ur http://localhost:8081");
});

//app.listen sempre deve ficar por ultimo do restantes das outras rotas.