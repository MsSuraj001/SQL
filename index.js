const { faker } = require("@faker-js/faker");
const  mysql  = require('mysql2');

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

  try{
    connection.query(q, [data], (err, result)=>{
        if(err) throw err;
        console.log(result);
        // console.log(result.length);
        // console.log(result[0]);
        // console.log(result[1]);
      })
  }catch(error){
    console.log("connection error");
    console.log(error);
  }

  connection.end();



//   console.log(createRandomUser());