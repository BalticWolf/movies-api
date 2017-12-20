class ReviewModel {
    constructor (db) {
        this.db = db;
        this.tableName = "review"
    }

    // Get an array of reviews by movie id
    getReviewsByMovieId(movieId, callback) {
        const reviews = [];
        const sql =
            "SELECT * " +
            "FROM " + this.tableName + " " +
            "WHERE movieId = ?";

        this.db.query(sql, [movieId], function(err, rows) {
            if (err) {
                return callback(err, [])
            }
            rows.forEach(review => {
                reviews.push({
                    "id": review.id,
                    "username": review.username,
                    "title": review.title,
                    "content": review.content,
                    "movieId": review.movieId,
                    "dateCreated": review.dateCreated
                })
            });
            return callback(null, reviews);
        });
    }

    // Create a new review by movie id
    createReview(body, callback) {
        const instant = new Date(Date.now()).toISOString();
        const sql =
            "INSERT INTO " + this.tableName + " " +
            "(username, title, content, movieId, dateCreated) " +
            "VALUES ?";
        const values = [
            [
                body.username,
                body.title,
                body.content,
                body.movieId,
                instant
            ]
        ];

        this.db.query(sql, [values], function(err, result) {
            if (err) {
                return callback('Error while performing Query.', {})
            }
            return callback(null, result);
        });
    }

    // Edit a review by id
    updateReview(id, body, callback) {
        const sql =
            "UPDATE " + this.tableName + " " +
            "SET ? " +
            "WHERE id = ?";
        const data = {
            title: body.title,
            content: body.content
        };

        this.db.query(sql, [data, id], function(err) {
            if (err) {
                return callback('Error while performing Query.', {})
            }
            return callback(null, {});
        });
    }

    // Delete a review by id
    deleteReview(id) {
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

module.exports = ReviewModel;
