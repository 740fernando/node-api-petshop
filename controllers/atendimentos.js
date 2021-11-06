module.exports= app =>{
    app.get('/atendimentos',(req,res)=> res.send('Você esta na rota de atendimento e está realizando um GET'));
}