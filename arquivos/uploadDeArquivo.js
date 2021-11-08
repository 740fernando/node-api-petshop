const fs = require('fs');// modulo file system, responsavel por manipular os arquivos 
const path = require('path');// responsavel por fazer leitura de caminhos e diretorios

//stream- vai pegar algo( no nosso caso, subir a imagem ou salvar imagem), vai fazendod isso em paralelo, conforme for precisando, nao precisa parar de executar suas coisas.  
//createReadStream - cria uma stream de leitura.

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada)=>
{
    const tiposValidos= ['jpg','png','jpeg']
    const tipo = path.extname(caminho); //extname = > determina a extensão
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1))!== -1;

    if(tipoEhValido){
        const novoCaminho= `./assets/imagens/${nomeDoArquivo}${tipo}`;
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))//responsavel pela conversao a stream de leitura para escrita
            .on('finish', () => callbackImagemCriada(false, novoCaminho)) // nossas streams imitem eventos, podemos configurar o metodo on() é executado, quando um evento for chamado   
    }else{
        const erro = "Tipo é inválido";
        console.log('Erro! Tipo inválido');
        callbackImagemCriada(erro);
    }
}