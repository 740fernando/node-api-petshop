const atendimentos = require('../models/atendimentos')
const Atendimento = require('../models/atendimentos')

module.exports= app =>{
    app.get('/atendimentos',(req,res)=>{
      atendimentos.lista(res)

    })

    app.get('/atendimentos/:id',(req,res)=>{
        const id = parseInt(req.params.id)
        
        atendimentos.buscarPorId(id,res);
    })
    
    app.post('/atendimentos',(req,res)=>{
        const atendimento = req.body;
        atendimentos.adiciona(atendimento, res);
    });

    app.patch('/atendimentos/:id',(req,res)=>{
      const id = parseInt(req.params.id);
      const valores = req.body;
      atendimentos.alterar(id,valores,res);
    })
}

/**
  a rota e as funcionalidades
Quando queremos enviar uma requisição usamos get, quando queremos receber usaremos post
req
 **/