// const express = require('express');
// const database = require('mysql2');
// const app = express();

// const db = database.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'corvit_database'
// });

// db.connect(error=>{
//     if(error){
//         console.log("Connection Error");
//     }else{
//         console.log("Connection Successful")
//     }
// });

// app.get('/api/users',(req,res)=>{
//     db.query('SELECT * FROM users', (err,result)=>{
//         if(err){
//             res.send("Failed to Fetch")
//         }else{
//             res.json(result);
//         }
//     })
// })

// app.listen(5000);