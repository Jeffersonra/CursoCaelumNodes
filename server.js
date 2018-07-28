// Criando o servidor para acesso da aplicacao
//var http = require("http")
var express = require("express")

//ouvindo eventos
//esperando Request
//Essa funcao é um listener // handler
/* var server = 
http.createServer(function trataPedidos(request, resposta){
    resposta.end("Oi Avanade Zika3006")
}) */

var server = express()


var expressValidator = require("express-validator")
//Plugin do express
server.use(expressValidator())
server.use(express.urlencoded())
server.use(express.json())

// var queryStrig = require('query-string')

// server.use(function (request, resposta, next){
//         request.body = ""

//         request.on("data",function(tecoBody){
//             request.body += tecoBody.toString();
//         })

//         request.on("end", function(){
//             console.log("Criou o body")
//             request.body = queryStrig.parse(request.body)
//             next()
//         })
//     })

server.get("/", function trataPedidos(request, resposta){
    resposta.render("index.ejs")
})

require("./routes/produtos")(server)


server.use(express.static("./static"))

server.use(function(request,resposta){
    resposta.status(404).render("erros/erro.ejs", {
        erro: "Se é Burro!?! -- 404 - Not Found"
    })
})

server.use(function(erro, request,resposta,next){
    resposta.format({
        html: () => resposta.status(500).render("erros/erro.ejs",{erro: erro})
        ,json: () => resposta.status(500).send(erro.message)
    })
})

module.exports = server