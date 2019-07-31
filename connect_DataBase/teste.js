const Sequelize = require("sequelize");
const sequelize = new Sequelize("test", "root", "bortolosso9090", { //primeiro, parametro é qual banco de dados deseja conectar; segundo, usuario do banco; terceiro, senha  
    host: "localhost", //host = local da/o maquina/servidor esta o DB //quarto, objeto JSON
    dialect: "mysql" //dialect = qual tipo de banco de dados
});

sequelize.authenticate().then(function(){ //then = funciona como uma funcao de callback; ela é executada quando algum evento acontece
    console.log("Conectado com sucesso !")    
}).catch(function(erro){
    console.log("Falha ao se conectar !" + erro)
});