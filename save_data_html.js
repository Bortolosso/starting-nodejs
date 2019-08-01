const bodyParser = require("body-parser");
const mysql = require("mysql");
const express =  require("express");

console.log("Get connection . . .");

//Config
    //Conexão Database
    const connect = mysql.createConnection({
        database: "testeNodeJs",
        host: "localhost",
        user: "root",
        password: "bortolosso9090"
    });
    connect.connect(function(err){
        if(err)throw err;
        console.log("Connected !");
    });

const app = express();

    //Body Parser
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json())

app.get("/", function(req, res){
    res.sendFile('/home/bortolossohurst/Documents/NodeJS/html/index.html')
});

app.post("/rota", function(req, res){
    conteudo = req.body.conteudo
    texto = req.body.titulo
    res.send("Titulo: " + texto + " Conteudo:" + conteudo)
    res.send("Dados Recebido !")
});

app.listen(8083, function(){
    console.log("Servidor rodando na url http://localhost:8083 !")
});