class PeopleModel {
    constructor (db) {
        this.db = db;
    }

    // get an array of all people
    getAll(callback) {
        const people = [];
        const sql =
            "SELECT * " +
            "FROM people " +
            "WHERE name IS NOT '' " +
            "ORDER BY name " +
            "LIMIT 50";
        this.db.query(sql, function(err, rows) {
            if (!err) {
                rows.forEach(person => {
                    const obj = {
                        "id": person.id,
                        "name": person.name,
                    };
                    people.push(obj);
                });

                callback(null, people);
            }
            else
                callback('Error while performing Query.', people)
        });
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
                callback(err, people)
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
    createPerson(body, callback) {
        const sql =
            "INSERT INTO people " +
            "(name) " +
            "VALUES ?";
        const values = [
            [
                body.name,
            ]
        ];

        this.db.query(sql, [values], function(err, result) {
            if (!err) {
                callback(null, result);
            }
            else
                callback('Error while performing Query.', {})
        });
    }
}

module.exports = PeopleModel;
