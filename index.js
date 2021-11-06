const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect(erro =>{
    if(erro){
        console.log(erro);
    }else{
        console.log("conectado com sucesso");

        Tabelas.init(conexao)//cria as tabelas

        const app = customExpress();
        app.listen(3000, () => console.log('servidor rodando na porta 3000'));  
    }
})

//responsabilidade do index é colocar o servidor execucação
