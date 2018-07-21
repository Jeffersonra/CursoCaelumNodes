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

server.get("/", function trataPedidos(request, resposta){
    resposta.render("index.ejs")
})

require("./routes/produtos")(server)


server.use(express.static("./static"))

module.exports = server