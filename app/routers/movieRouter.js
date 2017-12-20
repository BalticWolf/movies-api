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

// methods applied to route "/movies/:id"
router.route('/:id')
    .get(async function(req, res) {
        const movieId = parseInt(req.params.id);

        const movie = {};

        try {
            await movieModel.getMovieById(movieId, function(err, data) {
                if(err) {
                    console.log(err)
                } else {
                    Object.assign(movie, data);
                }
            });

            await genreModel.getGenresByMovieId(movieId, function(err, data) {
                if(err) {
                    console.log(err)
                } else {
                    Object.assign(movie, { genres: data })
                }
            });

            await peopleModel.getPeopleByMovieId("movie_actor", movieId, function(err, data) {
                if(err) {
                    console.log(err)
                } else {
                    Object.assign(movie, { actors: data })
                }
            });

            await peopleModel.getPeopleByMovieId("movie_director", movieId, function(err, data) {
                if(err) {
                    console.log(err)
                } else {
                    Object.assign(movie, { directors: data })
                }
            });

            await peopleModel.getPeopleByMovieId("movie_writer", movieId, function(err, data) {
                if(err) {
                    console.log(err)
                } else {
                    Object.assign(movie, { writers: data })
                }
            });

            await reviewModel.getReviewsByMovieId(movieId, function(err, data) {
                if(err) {
                    console.log(err)
                } else {
                    Object.assign(movie, { reviews: data });
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
        const id = parseInt(req.params.id);

        movieModel.deleteMovie(id, function(err, data) {
            if(err) {
                console.log(err)
            } else {
                return res.status(204).json(data)
            }
        });
    });

// methods applied to route "/movies"
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
