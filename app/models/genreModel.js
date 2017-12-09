class GenreModel {
    constructor (db) {
        this.db = db;
    }

    // get an array of all genres
    getAll(callback) {
        const genres = [];
        this.db.query("SELECT * FROM genre", function(err, rows) {
            if (!err) {
                rows.forEach(genre => {
                    const obj = {
                        "id": genre.id,
                        "name": genre.name,
                    };
                    genres.push(obj);
                });

                callback(null, genres);
            }
            else
                callback('Error while performing Query.', [])
        });
    }

    // get an array of genres by movie id
    getGenresByMovieId(movieId, callback) {
        const genres = [];
        const qry =
            "SELECT * " +
            "FROM genre " +
            "INNER JOIN movie_genre t " +
            "ON genre.id = t.genreId " +
            "WHERE t.movieId = ?";
        this.db.query(qry, [movieId], function(err, rows) {
            if (err) {
                callback(err, [])
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
    newGenre() {

    }

    // add a genre to a movie
    newMovieGenre() {

    }

    // edit a genre by id
    editGenre() {

    }

    // delete a genre by id
    deleteGenre() {

    }

    // delete a genre of a movie by movie id
    deleteMovieGenre() {

    }
}

module.exports = GenreModel;