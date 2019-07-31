// Parametro e um valor dinamico que o usuario possa passar

const express = require("express");
const app = express();

app.get("/saudacao/:nome/:cargo", function(req, res){ //ao colocar ":" inicia-se um parametro
    res.send("<h1> Saudacao" + " " + req.params.nome + "</h1>" + "\n" + "<h2> Cargo" + " " + req.params.cargo + "</h2>");
});

app.listen(8082, function(){
    console.log("Servidor rodando na url http://localhost:8082");
});

//app.listen sempre deve ficar por ultimo do restantes das outras rotas.