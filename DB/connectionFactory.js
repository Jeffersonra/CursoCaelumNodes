
var config = require('../config')

    var mysql = require('mysql')
    var connectionPool = mysql.createPool({
        host:config.DB_host,
        user:config.DB_user,
        password:config.DB_password,
        database:config.DB_database,
        port : config.DB_port
})

module.exports ={
   getConnection: function(){
       //Criação de promise
       return new Promise(function(resolve,reject){
           connectionPool.getConnection(function(err, conexao){
               if(!err){
                   resolve(conexao)
               }else{
                   reject(err)
               }
           })
       })
   }
}
