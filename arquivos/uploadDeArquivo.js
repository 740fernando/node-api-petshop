const fs = require('fs');// modulo file system, responsavel por manipular os arquivos 

//stream- vai pegar algo( no nosso caso, subir a imagem ou salvar imagem), vai fazendod isso em paralelo, conforme for precisando, nao precisa parar de executar suas coisas.  
//createReadStream - cria uma stream de leitura.

fs.createReadStream('./assets/pitbull.jpg')
    .pipe(fs.createWriteStream('./assets/pitbull-stream.jpg'))//responsavel pela conversao a stream de leitura para escrita
    .on('finish', () => console.log('Imagem foi escrita com sucesso')) // nossas streams imitem eventos, podemos configurar o metodo on() é executado, quando um evento for chamado