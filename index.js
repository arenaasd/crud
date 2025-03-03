const express = require('express');
const path = require('path');
const app = express(); 
const con = require('./models/user');

// Middleware setup
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/read', (req, res) => {
  
  con.connect(function (){
    let sql = "select * from new_table";
    con.query(sql, function(err, results){

      res.render('read', { users: results });
    })
  })
});

app.get('/delete', (req, res) => {
  
  con.connect(function (error){
    if(error) throw error;
    

    
    let sql = "delete from new_table where name = ?";
    let name = req.query.name;
    con.query(sql,[name], function(err, results){
      res.redirect('/read');
    })
  })
});

app.get('/update', (req, res) => {
  
  con.connect(function (error){
    if(error) throw error;
    

    
    let sql = "select * from new_table where name = ?";
    let name = req.query.name;
    con.query(sql,[name], function(err, results){
      res.render('update', { user: results[0] });
      
    })
  })
});

app.post('/updated', (req, res) => {

  let {name, email , imageurl} = req.body;
  let originalname = req.body.originalName;
   
  con.connect(function (error){
    if(error) throw error;
    

    
    let sql = "UPDATE new_table set name = ? , email = ? , imageurl = ? WHERE name = ? ";
    con.query(sql,[name, email, imageurl , originalname], function(err, results){
      res.redirect('/read');
    })
  })
  });


app.post('/create', (req, res) => {
  let {name , email , imageurl} = req.body;

    
    let sql = "INSERT INTO new_table (name , email , imageurl) VALUES (? ,? ,?)";
    con.query(sql, [name, email, imageurl], function (error, results, fields){
      if(error) throw error;
      res.redirect('/read');
    })
  });



module.exports = app;
