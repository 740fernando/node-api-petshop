const fs = require('fs');

fs.readFile('./assets/pitbull.jpg',async (erro, buffer)=>{
    console.log('imagem foi bufferizada')
    console.log(buffer)

    fs.writeFile('./assets/pitbull2.jpg', buffer, erro=>{
        console.log('imagem foi inscrita')
    })
})