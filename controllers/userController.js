const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const connection = require("../models/database")

module.exports = {
    async creatUserTable(req, res) {
        let sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), sex VARCHAR(10), department VARCHAR(20))";
        connection.query(sql, (err, respond) => {
            if (err) throw err
            console.log(respond)
            res.send("Table created")
        })
    },
    async getUser(req, res) {
        try {
            const user = await connection.query('SELECT * FROM users', (err, result) => {
                if (err) return res.status(500).send(err.message);
                return res.status(200).send(result);
            })

        } catch (error) {
            res.status(500).send(error.message)
        }

    },
    async getUserById(req, res) {
        try {
            const { id } = req.params
            const user = await connection.query(`SELECT name, email, sex, department, mobile FROM users WHERE id= '${id}'`, (err, response) => {
                if (response) {
                    console.log(user[0])
                    return res.send(response[0])
                }
                return res.status(500).send("An error occurred")
            })
        } catch (error) {
            return error
        }
    },
    async createUser(req, res) {
        try {
            const { name, email, password, sex, department, mobile } = req.body;

            /* Hashing password */
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const hashedPassword = await bcrypt.hash(password, salt);

            connection.query(`INSERT INTO users (name, email, password, sex, department, mobile) 
                VALUES ('${name}', '${email}', '${hashedPassword}', '${sex}', '${department}', '${mobile}')`, (error, result) => {
                if (error) {
                    return res.status(401).send("Email exist")
                }
                return res.status(200).send(result)
            })
        } catch (error) {
            res.status(500).send("Server Error")
            console.log(error.message)
        }
    },
    login(req, res) {
        try {
            // let email = req.body.email;
            // let password = req.body.password;
            const { email, password } = req.body;
            connection.query("SELECT * FROM users WHERE email = ? ", [email], (error, results, fields) => {
                if (results.length > 0) {
                    bcrypt.compare(req.body.password, results[0].password, (err, result) => {
                        if (result) {
                            return res.send(`${email}` + " Login successful");
                        } else {
                            return res.status(400).send("Email or password is incorrect");
                        }
                    })
                }
            })
        } catch (error) {
            res.status(500).send("Server Error")
        }
    },
    async updateUser(req, res) {
        try {
            const { name, email, sex, department, mobile } = req.body
            const { id } = req.params;
            let sql = `UPDATE users SET name = '${name}',
            email= '${email}',
            sex='${sex}',
            department='${department}',
            mobile='${mobile}'
            where id = ${id}`
            connection.query(sql, (err, respond) => {
                if (err) throw err
                console.log(respond)
                return res.send("Updated successfully")
            })
        } catch (error) {
            res.status(500).send("Server Error")
            console.log(error.message)
        }
    },
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const sql = `DELETE FROM users WHERE id = ${id}`
            connection.query(sql, (err, respond) => {
                if (err) throw err
                console.log(respond)
                return res.send("Deleted successfully")
            })
        } catch (error) {
            res.status(500).send("Server Error")
            console.log(error.message)
        }
    }

}