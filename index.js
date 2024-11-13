const { faker } = require("@faker-js/faker");
const  mysql  = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'mssuraj007'
  });

  try{
    connection.query("SHOW TABLES", (err, result)=>{
        if(err) throw err;
        console.log(result);
      })
  }catch(error){
    console.log("connection error");
    console.log(error);
  }

  connection.end();

let createRandomUser =  () => {
    return {
      userId: faker.string.uuid(),
      username: faker.internet.username(), // before version 9.1.0, use userName()
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    };
  }

//   console.log(createRandomUser());