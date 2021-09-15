 // require npm packages
 const mysql = require('mysql')

 const connection = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "",
     database: "interview"
 })


 connection.connect((err, res) => {
     if (err) throw err
     console.log('DB connected')
 })

 module.exports = connection


 // require("dotenv").config();

 // const { Pool } = require("pg");

 // const isProduction = process.env.NODE_ENV === "production";

 // const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME} `;

 // const pool = new Pool({
 //     connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
 // });

 // module.exports = { pool };