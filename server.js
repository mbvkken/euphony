const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session'); 

require('dotenv').config();

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: 'userid',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 1000,
    }
}))

const {
    createAlbumListByUser,
    createAlbumList,
    getAlbumsByUsername,
    getAlbumById
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

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/register', (req, res) =>{

    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        }
       db.query(
        "INSERT INTO users (username, password) VALUES (?,?)",
        [username, hash],
        (err, result) => {
            console.log(err);
        }
      ) 
    })   
})

app.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false})
    }
})

app.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query(
        'SELECT * FROM users WHERE username = ?;',
        username,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            } 
            
            if (result.length > 0) {
                    bcrypt.compare(password, result[0].password, (error, response) => {
                        if (response) {
                            req.session.user = result;
                            console.log(req.session.user);
                            res.send(result);
                        } else {
                            res.send({ message: 'wrong username/password' });
                        }
                    })
                } else {
                    res.send({ message: 'user does not exist' })
                }
            })
        })

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

app.get('/reviews/:id', (req, res) => {
    db.query('SELECT * FROM albums WHERE id = ?', req.params.id, 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

// app.get('/reviews/:id', async (req, res) => {
//     const { id } = req.params;
//     const reviews = await getAlbumById(id);
//     res.send(reviews);
// })

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

