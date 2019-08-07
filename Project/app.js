//Carregar modulos
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const admin = require("./routes/admin"); //Sempre passar o nome do aquivo para a const 
const path = require("path")//Modulo padrão do Node, modulo responsavel por manipular pastas/diretorios
const session = require("express-session");
const flash = require("connect-flash"); // O "flash" é um tipo de sessão que aparece apena uma vez. Ao atualizar a pagina a mensagem desaparece

//Config
    //Sessions
        app.use(session({
            secret: "senha123",
            resave: true,
            saveUninitialized: true
        }));
        app.use(flash());
    //Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg");// "locals" serve para criar variaveis globais
            res.locals.error_msg = req.flash("error_msg");
            next();
        });

    //Body Parser
        const urlencodedParse = bodyParser.urlencoded({extended:false}); 
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

    //Handlebars
        app.engine("handlebars", handlebars({defaultLayout: "main"}));
        app.set("view engine", "handlebars");        

    //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://localhost/project_study", {
            useNewUrlParser: true
        }).then(() => {
            console.log("Connected with success !");
        }).catch((err) => {
            console.log("There was an error connecting !" + err);
        });

    //Public
        //Configurar express para arquivos estáticos
        app.use(express.static(path.join(__dirname, "public"))); //Pegar caminho absoluto. 
        // app.use((req, res, next) =>{
        //     console.log("Hello, I'm Middleware !");
        //     next();
        // });


//Routes
    //Boa pratica é chamar as rotas depois das configurações
    app.use("/admin", urlencodedParse, admin);

//Others 
const PORT = 8081;
app.listen(PORT, () => {
    console.log("Server it's running in http://localhost:8081");
});