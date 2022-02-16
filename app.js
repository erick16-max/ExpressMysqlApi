 const express = require('express');
 const bodyParser = require ('body-parser');
 const mysql = require('mysql');
 

 const app = express();
 app.use(bodyParser.json());

 const con = mysql.createConnection({
     host:'localhost',
     user:'root',
     password:'',
     database:'nodesql',
     multipleStatements:true
 });

 con.connect((err) =>{
     if (err)  throw err;
     console.log("connected successfully!!");

 });

 //GET router to fetch all students from the database
 app.get('/students',(req,res) => {
    const sql = "SELECT * FROM students";
    con.query(sql,(err,row,fields) => {
        if (err) throw err;
        res.send(row);
       
        
    });
 });

 //Get router to fetch a particular student using id
 app.get('/students/:id' , (req, res) => {
    con.query('SELECT * FROM students WHERE id = ?',[req.params.id], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );

    //POST router to insert data to databse
    app.post('/students', (req,res) =>{
       let  id = req.body.id;
       let name = req.body.name;
       let course = req.body.course ;
        const sql = `INSERT INTO students VALUES ('${id}','${name}','${course}')`;

        con.query(sql,(err,result) => {
            if (err) throw err;
            res.send(result);
            console.log("data inserted successfully")
        })
    })

    //Delete from the database
    app.delete('/students/:id', (req,res) => {
       // let id = req.body.id;
        const sql = `DELETE FROM students WHERE id=?`;

        con.query(sql,[req.params.id],(err,rows,field) => {
            if (err) throw err;
            res.send(rows)
            console.log("data successfully deleted");
        })
    });

    //Update data in the database
    app.post('/students/:id' , (req,res) =>{
        let name = req.body.name;
        let course = req.body.course;
        let sql = `UPDATE students SET ? WHERE id=?`;

        con.query(sql,[req.body,req.params.id],(err,rows,fields) =>{
            if (err) throw err;
            res.send(rows);
            console.log("data updated successfully");
        })
    })
 const port = process.env.PORT || 8080 ;

 app.listen(port, ()=>{
     console.log(`app listening on port ${port}`);
 });
