class PeopleModel {
    constructor (db) {
        this.db = db;
        this.tableName = "people";
    }

    // get an array of all people
    getAll(callback) {
        const people = [];
        const sql =
            "SELECT * " +
            "FROM " + this.tableName + " " +
            "WHERE name IS NOT '' " +
            "ORDER BY name " +
            "LIMIT 50";

        this.db.query(sql, function(err, rows) {
            if (err) {
                return callback('Error while performing Query.', people)
            }
            rows.forEach(person => {
                const obj = {
                    "id": person.id,
                    "name": person.name,
                };
                people.push(obj);
            });

            return callback(null, people);
        });
    }

    // get an array of people by movie id
    getPeopleByMovieId(linkTable, movieId, callback) {
        const people = [];
        const sql =
            "SELECT * " +
            "FROM " + this.tableName + " a " +
            "INNER JOIN " + linkTable + " t " +
            "ON a.id = t.peopleId " +
            "WHERE t.movieId = ?";

        this.db.query(sql, [movieId], function(err, rows) {
            if (err) {
                return callback('Error while performing Query.', people)
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
            "INSERT INTO " + this.tableName + " " +
            "(name) " +
            "VALUES ?";
        const values = [
            [
                body.name,
            ]
        ];

        this.db.query(sql, [values], function(err, result) {
            if (err) {
                return callback('Error while performing Query.', {});
            }
            return callback(null, result);
        });
    }

    // Edit a person by id
    updatePerson(id, body, callback) {
        const sql =
            "UPDATE " + this.tableName + " " +
            "SET ? " +
            "WHERE id = ?";
        const data = {
            name: body.name
        };

        this.db.query(sql, [data, id], function(err) {
            if (err) {
                return callback('Error while performing Query.', {})
            }
            return callback(null, {});
        });
    }

    // Delete a person by id
    deletePerson(id) {
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

module.exports = PeopleModel;
