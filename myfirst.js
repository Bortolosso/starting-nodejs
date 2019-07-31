var http = require('http')

http.createServer(function(req, res){ //req = Requisição e res = Resposta
    res.end("Hello Word !")
}).listen(8081)

console.log("Servidor local rodando . . .")