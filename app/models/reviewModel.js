class ReviewModel {
    constructor (db) {
        this.db = db;
    }

    // Get an array of reviews by movie id
    getReviewsByMovieId(movieId, callback) {
        const reviews = [];
        const qry =
            "SELECT * " +
            "FROM review " +
            "WHERE movieId = ?";
        this.db.query(qry, [movieId], function(err, rows) {
            if (err) {
                callback(err, [])
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
            "INSERT INTO review " +
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
            // this.db.end();
            if (!err) {
                callback(null, result);
            }
            else
                callback('Error while performing Query.', {})
        });
    }

    // Edit a review by id
    editReview() {

    }

    // Delete a review by id
    deleteReview() {

    }

    // Delete all reviews by movie id
    deleteAllReviews() {

    }
}

module.exports = ReviewModel;