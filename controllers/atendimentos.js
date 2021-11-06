module.exports= app =>{
    app.get('/atendimentos',(req,res)=> res.send(` Você esta na rota de atendimento e está realizando um GET`));
    app.post('/atendimentos',(req,res)=>{
        console.log(req.body);
        res.send('Voê está na rota de atendimento e está realizando um POST')
    });
}

/**
  a rota e as funcionalidades
Quando queremos enviar uma requisição usamos get, quando queremos receber usaremos post
req
 **/