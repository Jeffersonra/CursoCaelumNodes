//TODO Copiar o exemplo do Artur

function Lista(conexao){
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

function Salvar(conexao, livro){
    return new Promise(function(resolve,reject){
            conexao.query("INSERT INTO livros SET ?",livro, function(err){
                if(!err){
                    resolve()
                }else {
                    reject(err)
                }
            })
        })
    }

module.exports = class LivrosDAO{
    constructor(conexao){
        this._conexao = conexao
    }

    salvar(livros) {
        return Salvar(this._conexao,livros)
    }

    lista() {
        return Lista(this._conexao)
    }
}