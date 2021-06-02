const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// connection to db

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port ' + listener.address().port)
})

app.post('/register', (req, res) =>{

    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "INSERT INTO users (username, password) VALUES (?,?)",
        [username, password],
        (err, result) => {
            console.log(err);
        }
    )
})

app.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password],
        (err, result) => {

            if (err) {
                res.send({ err: err });
            } 
                if (result.length > 0) {
                    res.send(result);
                } else {
                    res.send({ message: 'wrong username/password' })
                }
            }            
        
    )
})

// routes

app.get('/reviews', (req, res) => {
    db.query('SELECT * FROM albums', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/reviews', (req, res) => {
    const insertQuery = 'INSERT INTO albums SET ?';
    db.query(insertQuery, req.body, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('review successfully added')
        }
    });
});

app.put('/reviews', (req, res) => {
    const updateQuery = 
    'UPDATE albums SET album_review = ?, album_rating = ? WHERE id = ?';
    db.query(
        updateQuery,
        [req.body.album_review, req.body.album_rating, req.body.id],
        (err, result) => {
            if (err) {
                console.log(result);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete('/reviews/:id', (req, res) => {
    db.query(
        'DELETE FROM albums WHERE id = ?',
        req.params.id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

