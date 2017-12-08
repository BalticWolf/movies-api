class GenresModel {
    constructor (db) {
        this.db = db;
    }


    // get an array of all genres
    getAll(callback) {

        const genres = [];
        this.db.query("SELECT * FROM genre", function(err, rows, fields) {
            // this.db.end();
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
    getMovieGenres() {

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

module.exports = GenresModel;