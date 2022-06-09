const express = require("express");
const app = express()
const mysql = require("mysql")
const cors = require("cors")
// let config = require('./config');

// let conncetion = mysql.createConnection(config);
// let sql=`CALL test(?)`;

// conncetion.query(sql,true,(error,result,fields)=>{
//     if (error){
//         return console.log.error(error.message);
//     }
//     console.log(result[0]);
// })

app.use(cors());
app.use(express.json())

const db=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"root",
    database:"checkdata"

})

const db1=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"root",
    database:"newdata"

})

db.connect((err)=>{
    err?console.log(err):console.log("connected")
})


app.post("/create",(req,res)=>{

    console.log(req.body)
    const name = req.body.name
    const Email = req.body.Email
    const Mobile = req.body.Mobile
    db.query('INSERT INTO dataemp(name,email,Mobile) VALUES (?,?,?)',[name,Email,Mobile],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("values insteted ")
        }
    } )
})

app.get('/dataemp',(req,res)=>{
    db.query("SELECT * FROM dataemp",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
})
app.get('/persons',(req,res)=>{
    db.query("select ucase(LastName) from user",(err,result)=>{
        if(err){
            console.log(err);
        }else{ 
            res.send(result)
        }
    })
})

app.get('/getall',(req,res)=>{
    db.query("call getall()",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            return res.send({ message : "success", results : result[0]})
            console.log("output",result[0]);
        }
    })
})

app.get('/callseller',(req,res)=>{
    db1.query("call callseller()",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send({message:"sucess",results:result})
            console.log("hhhf",result)
        }
    })
})


app.listen(3001,() =>{
    console.log("server running port 3001")
})