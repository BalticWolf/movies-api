class PeopleModel {
    constructor (db) {
        this.db = db;
    }

    // get an array of all people
    getPeople() {

    }

    // get an array of people by movie id
    getPeopleByMovieId(linkTable, movieId, callback) {
        const people = [];
        const qry =
            "SELECT * " +
            "FROM people " +
            "INNER JOIN " + linkTable + " t " +
            "ON people.id = t.peopleId " +
            "WHERE t.movieId = ?";
        this.db.query(qry, [movieId], function(err, rows) {
            if (err) {
                callback(err, [])
            }
            rows.forEach(person => {
                people.push({
                    "id": person.id,
                    "name": person.name
                })
            });
            return callback(null, people);

        });
    }

    // create a new person
    newPerson() {

    }

    // add a person to a movie
    newMoviePerson(){

    }

    // edit a person by id
    editPerson() {

    }

    // delete a person by id
    deletePerson() {

    }

    // delete the person of a movie by movie id
    deleteMoviePerson(){

    }
}

module.exports = PeopleModel;
