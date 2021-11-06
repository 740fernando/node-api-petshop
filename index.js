const express = require('express'); // biblioteca

const app= express();

app.listen(3000, ()=> console.log('servidor rodando na porta 3000'));

app.get('/atendimentos',(req,res)=> res.send('Você esta na rota de atendimento e está realizando um get '));

