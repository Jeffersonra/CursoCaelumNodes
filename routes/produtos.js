//Singleton
var createConnection = require("../DB/connectionFactory")

function pegaLivros(conexao){
    return new Promise(function(resolve,reject){
        conexao.query('SELECT * FROM livros',function(err,livros){
            if(!err){
                resolve(livros)
            }else {
                reject(err)
            }
        })
    })
}

//Modulo que exporta os resultados
// Metodo com Promise
// module.exports = function (server){       
//     server.get("/produtos", function trataPedidos(request, resposta){

//         //Criação das Promise
//         var promiseConexao = createConnection.getConnection()
//         promiseConexao
//             .then(function(conexao){
//                 console.log("CRIOU A CONEXAO")
//                 return pegaLivros(conexao)
//                 //conexao.query('SELECT * FROM livros')
//             })
//             .then(function(livros){
//                 resposta.render("produtos/lista.ejs", { 
//                     livros: livros
//                 })
//             })
//             .catch(function(err){
//                 resposta.send(err.message)
//             }) 
//     })
// }

//Await metodo async 
module.exports = function (server){  
    //Lista Produtos     
    server.get("/produtos", async function (request, resposta){
        try{
                var conexao = await createConnection.getConnection()
                var livros = await pegaLivros(conexao)
                resposta.render("produtos/lista.ejs", { 
                                livros: livros  })
        }
        catch(err){
            resposta.send(err.message)
        }
    })

    //Novos Produtos
    server.get("/produtos/form", function (request, resposta){
                resposta.render("produtos/form.ejs", {validationErrors:[] })
        })

    server.post("/produtos", function (request, resposta){
            var livro = request.body;
            var valida = livro.titulo;
            console.log(valida)
            if(valida){
                resposta.redirect("/produtos")
            }else{
                resposta.render("produtos/form.ejs", {validationErrors:[] })
            }
        })
}
