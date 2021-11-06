const Atendimento = require('../models/atendimentos')

module.exports= app =>{
    app.get('/atendimentos',(req,res)=> res.send(` Você esta na rota de atendimento e está realizando um GET`));
    
    app.post('/atendimentos',(req,res)=>{
        const atendimento = req.body;
        Atendimento.adiciona(atendimento);
        res.send('Post atendimento');
    });
}

/**
  a rota e as funcionalidades
Quando queremos enviar uma requisição usamos get, quando queremos receber usaremos post
req
 **/