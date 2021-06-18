const mysql = require('mysql2');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

function getAlbumById(id) {
    return db.query(`
        SELECT 
            albums.id,
            albums.album_title,
            albums.album_review,
            albums.album_rating,
            albums.artist
        FROM albums;
    `, [id])
    .then((results) => results.rows)
}

function createAlbumListByUser(album_id, username) {
    return db.promise().query(
        `INSERT INTO user_albumlist
            (username, album_id)
        VALUES
            (?, ?)
        `, [username, album_id]
    );
}

function createAlbumList(album_title, noNullEmailArray) {
    return db.promise().query(
        `INSERT INTO albums
            (album_title)
        VALUES
            (?);
    `, [album_title]
    ).then((res) => {
        noNullEmailArray.forEach((username) => 
        createAlbumListByUser(res[0].insertId, username)
        );
        return res[0].insertId;
    });
}

function getAlbumsByUsername(username) {
    
    return db.promise().query(
        `
      SELECT * 
          FROM albums
          INNER JOIN user_albumlist ON albums.id = user_albumlist.albums.id
          WHERE user_albumlist.username = ?
      `,
        [username]
      )
      .then((result) => result[0]);
  }

module.exports = {
    createAlbumListByUser,
    createAlbumList,
    getAlbumsByUsername,
    getAlbumById
};