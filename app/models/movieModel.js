class MovieModel {
    constructor (db) {
        this.db = db;
        this.tableName = "movie"
    }

    getAll(callback) {
        const movies = [];
        const sql =
            "SELECT * " +
            "FROM " + this.tableName + " " +
            "LIMIT 10";

        this.db.query(sql, function(err, rows) {
            if (err) {
                return callback('Error while performing select Query.', movies)
            }
            rows.forEach(movie => {
                const obj = {
                    "id": movie.id,
                    "imdbId": movie.imdbId,
                    "title": movie.title,
                    "year": movie.year,
                    "plot": movie.plot,
                    "rating": movie.rating,
                    "votes": movie.votes,
                    "runtime": movie.runtime,
                    "trailerId": movie.trailerId,
                    "dateCreated": movie.dateCreated,
                    "dateModified": movie.dateModified
                };
                movies.push(obj);
            });

            return callback(null, movies);
        });
    };

    getMovieById(id, callback) {
        const sql =
            "SELECT * " +
            "FROM " + this.tableName + " " +
            "WHERE id = ?";

        this.db.query(sql, [id], function(err, rows) {
            if (err) {
                return callback('Error while performing select Query.', {});
            }
            return callback(null, rows[0]);
        })
    };

    createMovie(body, callback) {
        const instant = new Date(Date.now()).toISOString();
        const sql =
            "INSERT INTO " + this.tableName + " " +
            "(imdbId, title, year, plot, rating, votes, runtime, trailerId, dateCreated, dateModified) " +
            "VALUES ?";

        const values = [
            [
                body.imdbId,
                body.title,
                body.year,
                body.plot,
                body.rating,
                body.votes,
                body.runtime,
                body.trailerId,
                instant,
                instant
            ]
        ];
        //TODO: add People and genres
        this.db.query(sql, [values], function(err, result) {
            if (err) {
                return callback('Error while performing insert Query.', {})
            }
            return callback(null, result);
        });
    };

    updateMovie(id, body, callback) {
        const instant = new Date(Date.now()).toISOString();
        const sql =
            "UPDATE " + this.tableName + " " +
            "SET ? " +
            "WHERE id = ?";

        const data = {
                imdbId: body.imdbId,
                title: body.title,
                year: body.year,
                plot: body.plot,
                rating: body.rating,
                votes: body.votes,
                runtime: body.runtime,
                trailerId: body.trailerId,
                dateModified: instant
            };
        //TODO: add People and genres
        this.db.query(sql, [data, id], function(err, result) {
            if (err) {
                return callback('Error while performing update Query.', {})
            }
            return callback(null, result);
        });
    };

    deleteMovie(id, callback) {
        const sql =
            "DELETE FROM " + this.tableName + " " +
            "WHERE id = ?";

        this.db.query(sql, [id], function(err) {
            if (err) {
                return callback('Error while performing delete Query.', {})
            }
            return callback(null, {});
        });
    };
}

module.exports = MovieModel;
