const fs = require('fs');// modulo file system, responsavel por manipular os arquivos 

//stream- vai pegar algo( no nosso caso, subir a imagem ou salvar imagem), vai fazendod isso em paralelo, conforme for precisando, nao precisa parar de executar suas coisas.  
//createReadStream - cria uma stream de leitura.

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada)=>
{
    const novoCaminho= `./assets/imagens/${nomeDoArquivo}`;
    fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(novoCaminho))//responsavel pela conversao a stream de leitura para escrita
        .on('finish', () => callbackImagemCriada(novoCaminho)) // nossas streams imitem eventos, podemos configurar o metodo on() é executado, quando um evento for chamado
}