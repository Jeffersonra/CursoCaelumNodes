var server = require("../../server")
var supertest = require("supertest")
var request = supertest(server)

describe("/produtos",function(){

    it("retorna 400 no erro",function(next){
        request.post("/produtos")
                .set({
                    "Content-Type":"application/json; charset=utf-8"
                })
                .send({
                    titulo:"",
                    preco:"sdasda",
                    descricao:"teste request"
                })
                .expect(400, next)
    })

    it("listar JSON",function(next){
        request.get("/produtos")
        .set({
            "Accept": "application/json"
        })
        .expect("Content-Type","application/json; charset=utf-8", next)
    })
})