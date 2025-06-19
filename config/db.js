const dotenv = require('dotenv').config();
const mysql = require("mysql2");




const con = mysql.createConnection(
    {
        host :process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASS,
        database:process.env.DB_NAME
    }
)

con.connect((err) => {
    if(err){
        console.log(err)
    }
    else{
        console.log('connected !!!')
    }
})

module.exports = con.promise();
