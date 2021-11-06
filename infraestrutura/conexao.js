const mysql = require('mysql2');

//configuracoes do banco de dados, informacoes que o mysql prcisa para fazer conexao
const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'agenda-petshop'
})

module.exports = conexao;