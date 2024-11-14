const { faker } = require("@faker-js/faker");
const  mysql  = require('mysql2');
const express = require('express');
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'mssuraj007'
  });

  let createRandomUser =  () => {
    return [
      faker.string.uuid(),
      faker.internet.username(), // before version 9.1.0, use userName()
      faker.internet.email(),
      faker.internet.password(),
    ];
  }

  // Inserting the single data 
  // const q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
  // let user = ["123", "abc123", "abc@gmail.com", "1234"];


  // Inserting the single data 
  // const q = "INSERT INTO user (id, username, email, password) VALUES ?";
  // let users = [
  //   ["123a", "abc123a", "abca@gmail.com", "1234a"],
  //   ["123b", "abc123b", "abcb@gmail.com", "1234b"]
  // ];

  const q = "INSERT INTO user (id, username, email, password) VALUES ?";
  let data = [];
  for(let i= 1; i <= 100; i++){
    data.push(createRandomUser());
    
  }

  // try{
  //   connection.query(q, [data], (err, result)=>{
  //       if(err) throw err;
  //       console.log(result);
  //       // console.log(result.length);
  //       // console.log(result[0]);
  //       // console.log(result[1]);
  //     })
  // }catch(error){
  //   console.log("connection error");
  //   console.log(error);
  // }

  // connection.end();

  app.get("/", (req, res)=>{
    let q = "SELECT count(*) FROM user";
    try{
      connection.query(q, [data], (err, result)=>{
          if(err) throw err;
          let count = result[0]["count(*)"];
          res.render("home.ejs", { count })
        })
    }catch(error){
      res.send("Fetching the data error")
    }
  })

app.listen("8080", ()=>{
  console.log("Server start at the port 8080")
})


//   console.log(createRandomUser());