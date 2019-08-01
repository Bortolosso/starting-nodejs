//Models de POST
// Boa pratica é sempre criar files com a primeira letra maiscula se tratando de Models

const db = require("./database");

const Post = db.sequelize.define("datas", {
    titulo:{
        type: db.Sequelize.STRING
    },
    conteudo:{
        type: db.Sequelize.TEXT
    }
});

module.exports = Post