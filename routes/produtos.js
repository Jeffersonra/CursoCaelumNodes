//Singleton
var createConnection = require("../DB/connectionFactory")
var LivrosDAO = require("../DB/LivrosDAO")


//#region  
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
//#endregion

//Await metodo async 
module.exports = function (server){  
    //Lista Produtos     
    server.get("/produtos", async function (request, resposta){
        try{
                var conexao = await createConnection.getConnection()
                var livrosDAO = new  LivrosDAO(conexao)
                var livros = await livrosDAO.lista()

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

    server.post("/produtos", async function (request, resposta){
            var livro = request.body;

            request.assert("titulo", "Titulo Invalido").notEmpty()
            request.assert("preco", "Preço Não deve ser vazio").notEmpty()
            request.assert("preco", "Preço Invalido").isNumeric()
            request.assert("descricao", "Descrição Invalido").notEmpty()

            try{
                await request.asyncValidationErrors()
                var conexao = await createConnection.getConnection()
                try{
                    var livrosDAO = new  LivrosDAO(conexao)
                    await livrosDAO.salvar(livro);
                    conexao.release()    

                    resposta.redirect("/produtos")
                }catch(erroDB){
                    resposta.send(erroDB)
                }

                
            }catch(validationErrors){
                resposta.render("produtos/form.ejs", {validationErrors})
            }
        })
}
