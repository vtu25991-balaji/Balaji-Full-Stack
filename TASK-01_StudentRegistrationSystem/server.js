const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Arevamsi",
    database:"student_db"
});

db.connect(function(err){
    if(err) throw err;
    console.log("Database Connected");
});

app.post("/register",(req,res)=>{

    const {name,email,dob,department,phone} = req.body;

    const sql = "INSERT INTO students(name,email,dob,department,phone) VALUES (?,?,?,?,?)";

    db.query(sql,[name,email,dob,department,phone],(err,result)=>{
        if(err) throw err;

        res.send("Student Registered Successfully");
    });

});

app.get("/students",(req,res)=>{

    db.query("SELECT * FROM students",(err,result)=>{
        if(err) throw err;

        res.json(result);
    });

});

app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000");
});