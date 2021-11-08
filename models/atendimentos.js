const axios = require('axios');
const moment = require('moment'); // responsavel pela formatacao da data
const atendimentos = require('../controllers/atendimentos');
const conexao = require('../infraestrutura/database/conexao');
const repositorio = require('../repositorios/atendimento');

class Atendimento{
    
    constructor() {
        this.dataEhValida = ({data,dataCriacao})=>moment(data).isSameOrAfter(dataCriacao) // isSameOrAfter- vai comparar se a data do body é igual ou superior a dtCriacao, retorna true caso seja
        this.clienteEhValido = (tamanho)=> tamanho >=5
       
        this.valida= parametros =>this.validacoes.filter(campo=>{
            const {nome} = campo
            const parametro =parametros[nome]

            return !campo.valido(parametro)
        })
        
        this.validacoes = [
            {
                nome: "data",
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome:'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
    }   
    adiciona(atendimento) {
   
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data,'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        const parametros= {
            data:{data,dataCriacao},
            cliente:{tamanho: atendimento.cliente.length}
        }
        const erros = this.valida(parametros);
        
        const existemErros = erros.length

        if(existemErros){
            return new Promise((resolve,reject)=>reject(erros))
        }else{
            const atendimentoDatado= {...atendimento, dataCriacao, data};
            return repositorio.adiciona(atendimentoDatado)
                .then(resultados =>{
                    const id = resultados.insertId;
                    return {...atendimentoDatado,id}
                })
        }
    }
    lista(){
        return repositorio.lista();
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