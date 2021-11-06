const express = require('express'); //configurações comuns da aplicação web, como a porta a ser usada para conexão e a localização dos modelos que são usados para renderizar a resposta
const consign = require('consign')//Consign é sugerida para facilitar o gerenciamento das rotas no express


module.exports=() =>{
    const app= express();
    app.use(express.json())
    app.use(express.urlencoded({ extended: true}))
    consign()
        .include('controllers')
        .into(app) // estou passando app para o controler
    return app;
}
//CustomExpress- configuraçoes do express