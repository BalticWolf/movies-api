const express = require('express');
const router = express.Router();
const connection = require('../dbConnector');
const MovieModel = require('../models/movieModel');
const PeopleModel = require('../models/peopleModel');
const ReviewModel = require('../models/reviewModel');
const GenreModel = require('../models/genreModel');

const movieModel = new MovieModel(connection);
const peopleModel = new PeopleModel(connection);
const reviewModel = new ReviewModel(connection);
const genreModel = new GenreModel(connection);

// réponse à l'url "/movies/:id"
router.route('/:id')
    .get(async function(req, res) {
        const movieId = parseInt(req.params.id);

        let movie = {};

        try {
            await reviewModel.getReviewsByMovieId(movieId, function(err, data) {
                if(err) {
                    console.log(err)
                } else {
                    Object.assign(movie, { reviews: data })
                }
            })
        } catch (err) {
            logger.error('Mysql error', err);
            return res.status(500).send();
        }

        try {
            await genreModel.getGenresByMovieId(movieId, function(err, data) {
                if(err) {
                    console.log(err)
                } else {
                    Object.assign(movie, { genres: data })
                }
            })
        } catch (err) {
            logger.error('Mysql error', err);
            return res.status(500).send();
        }

        try {
            await peopleModel.getPeopleByMovieId("movie_actor", movieId, function(err, data) {
                if(err) {
                    console.log(err)
                } else {
                    Object.assign(movie, { actors: data })
                }
            })
        } catch (err) {
            logger.error('Mysql error', err);
            return res.status(500).send();
        }

        try {
            await peopleModel.getPeopleByMovieId("movie_director", movieId, function(err, data) {
                if(err) {
                    console.log(err)
                } else {
                    Object.assign(movie, { directors: data })
                }
            })
        } catch (err) {
            logger.error('Mysql error', err);
            return res.status(500).send();
        }

        try {
            await peopleModel.getPeopleByMovieId("movie_writer", movieId, function(err, data) {
                if(err) {
                    console.log(err)
                } else {
                    Object.assign(movie, { writers: data })
                }
            })
        } catch (err) {
            logger.error('Mysql error', err);
            return res.status(500).send();
        }

        try {
            await movieModel.getMovieById(movieId, function(err, data) {
                if(err) {
                    console.log(err)
                } else {
                    Object.assign(movie, data);
                    return res.status(200).json(movie);
                }
            });
        } catch (err) {
            logger.error('Mysql error', err);
            return res.status(500).send();
        }
    })
    .put(function(req, res) {
        const id = parseInt(req.params.id);
        const body = req.body;

        movieModel.updateMovie(id, body, function (err, data) {
            if(err) {
                console.log(err)
            } else {
                // TODO: Ajouter les détails acteurs...
                return res.status(200).json(data)
            }
        })
    })
    .delete(function(req, res) {
        const id = req.params.id;

        movieModel.deleteMovie(id, function(err, data) {
            if(err) {
                console.log(err)
            } else {
                return res.status(204).json(data)
            }
        });
    });

router.route('/')
    .all(function (req, res, next) {
        next();
    })
    .get(function(req, res) {
        movieModel.getAll(function(err, data) {
            if(err) {
                console.log(err)
            } else {
                return res.status(200).json(data)
            }
        })
    })
    .post(function (req, res) {
        const body = req.body;

        movieModel.createMovie(body, function(err, data) {
            if(err) {
                console.log(err)
            } else {
                // TODO: Ajouter les détails acteurs...
                return res.status(201).json(data)
            }
        })
    });

module.exports = router;