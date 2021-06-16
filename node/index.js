const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'DB_DESAFIO'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)


getCourses = function(){
  return new Promise(function(resolve, reject){
    connection.query(
        "SELECT DS_SUBJECT FROM DB_DESAFIO.TB_SUBJECTS",
        function(err, rows){
            if(rows === undefined){
              console.log("Promise rejection error: "+err);
            }else{
                resolve(rows);
            }
        }
    )}
)}

app.get('/', (req,res) => {
  response = '<h1>Full Cycle Rocks!</h1> <br>';
    getCourses().then(function(results){
           response += "<h2>"+results.length+" Curso(s) encontrado(s) </h2>";
           response += "<ul>";
           for (var i in results) {
              response += "<li>" + results[i].DS_SUBJECT + "</li>";
           }
           response += "</ul>";
           res.send(response);
    }).catch(function(err){
          res.send("<h1>ERROR</h1>")
    });
})


app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})
