class GenreModel {
    constructor (db) {
        this.db = db;
        this.tableName = "genre";
    }

    // get an array of all genres
    getAll(callback) {
        const genres = [];
        this.db.query("SELECT * FROM genre", function(err, rows) {
            if (err) {
                return callback('Error while performing Query.', [])
            }
            rows.forEach(genre => {
                const obj = {
                    "id": genre.id,
                    "name": genre.name,
                };
                genres.push(obj);
            });

            return callback(null, genres);
        });
    }

    // get an array of genres by movie id
    getGenresByMovieId(movieId, callback) {
        const genres = [];
        const qry =
            "SELECT * " +
            "FROM " + this.tableName + " a " +
            "INNER JOIN movie_genre t " +
            "ON a.id = t.genreId " +
            "WHERE t.movieId = ?";

        this.db.query(qry, [movieId], function(err, rows) {
            if (err) {
                return callback(err, [])
            }
            rows.forEach(genre => {
                genres.push({
                    "id": genre.id,
                    "name": genre.name
                })
            });
            return callback(null, genres);
        });
    }

    // create a new genre
    createGenre(body, callback) {
        const sql =
            "INSERT INTO " + this.tableName + " " +
            "(name) " +
            "VALUES ?";
        const values = [
            [
                body.name
            ]
        ];

        this.db.query(sql, [values], function(err, result) {
            if (err) {
                return callback('Error while performing Query.', [])
            }
            return callback(null, result);
        });
    }

    // edit a genre by id
    updateGenre(id, body, callback) {
        const sql =
            "UPDATE " + this.tableName + " " +
            "SET ? " +
            "WHERE id = ?";
        const data = {
            name: body.name,
        };

        this.db.query(sql, [data, id], function(err) {
            if (err) {
                return callback('Error while performing Query.', {})
            }
            return callback(null, {});
        });
    }

    // delete a genre by id
    deleteGenre(id, callback) {
        const sql =
            "DELETE FROM " + this.tableName + " " +
            "WHERE id = ?";

        this.db.query(sql, [id], function(err) {
            if (err) {
                return callback('Error while performing Query.', {})
            }
            return callback(null, {});
        });
    }
}

module.exports = GenreModel;
