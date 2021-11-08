const axios = require('axios');
const moment = require('moment'); // responsavel pela formatacao da data
const atendimentos = require('../controllers/atendimentos');
const conexao = require('../infraestrutura/conexao')

class Atendimento{
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data,'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao); // isSameOrAfter- vai comparar se a data do body é igual ou superior a dtCriacao, retorna true caso seja
        const clienteEhValido = atendimento.cliente.length >=5
        console.log(dataEhValida);
        const validacoes = [
            {
                nome: "data",
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome:'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
        
        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }else{
            const atendimentoDatado= {...atendimento, dataCriacao, data};
            const sql = 'INSERT INTO Atendimentos SET ?'
    
            conexao.query(sql,atendimentoDatado,(erro,resultados)=>{
                if(erro){
                   res.status(400).json(erro);
                }else{
                    res.status(201).json(resultados);
                }
            })
        }
    }
    lista(res){
        const sql = 'SELECT * from atendimentos'
        conexao.query(sql, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        })
    }
    buscarPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

        conexao.query(sql, async(erro,resultado)=>{
            const atendimento= resultado[0];
            const cpf = atendimento.cliente;
            if(erro){
                res.status(400).json(erro);//ero de sql
            }else{
                const {data} = await axios.get(`http://localhost:8082/${cpf}`); // axios - responsavel pela comunicação com api externa {data}
                atendimento.cliente = data;
                res.status(200).json(atendimento);
            }
        })
    }
    alterar(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data,'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';

        conexao.query(sql, [valores, id], (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        })
    }
}

module.exports= new Atendimento;