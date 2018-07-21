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
module.exports = function (server){       
    server.get("/produtos", function trataPedidos(request, resposta){

        //Criação das Promise
        var promiseConexao = createConnection.getConnection()
        promiseConexao
            .then(function(conexao){
                console.log("CRIOU A CONEXAO")
                return pegaLivros(conexao)
                //conexao.query('SELECT * FROM livros')
            })
            .then(function(livros){
                resposta.render("produtos/lista.ejs", { 
                    livros: livros
                })
            })
            .catch(function(err){
                resposta.send(err.message)
            }) 
    })
}

