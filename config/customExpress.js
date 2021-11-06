const express = require('express'); // biblioteca
const consign = require('consign')
const app= express();

module.exports=() =>{
    consign()
        .include('controllers')
        .into(app) // estou passando app para o controler
    return app;
}
