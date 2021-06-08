const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();
const bodyParser = require("body-parser");

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const {
    createAlbumListByUser,
    createAlbumList,
    getAlbumsByUsername
} = require('./services/database-album');

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

// login&register

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

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// CRUD routes

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
                console.log(err);
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


// albumlists

app.post('/albumlist', async (req, res) => {
    const { album_title, noNullEmailArray } = req.body;
    const newAlbumList = await createAlbumList(album_title, noNullEmailArray);
    res.send({ newAlbumList });
});

app.get("/albumlist/:username", async (req, res) => {
    const { username } = req.params;
    const albumList = await getAlbumsByUsername(username);
    res.send(albumList);
    console.log(albumList);
  });

