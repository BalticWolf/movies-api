const express = require('express');
const router = express.Router();
const connection = require('../dbConnector');
const MovieModel = require('../models/movieModel');
const PeopleModel = require('../models/peopleModel');

const movieModel = new MovieModel(connection);
const peopleModel = new PeopleModel(connection);

// réponse à l'url "/movies/:id"
router.route('/:id')
    .get(async function(req, res) {
        const movieId = parseInt(req.params.id);

        let movie = null;

        try {
            await movieModel.getMovieById(movieId, function(err, data) {
                if(err) {
                    console.log(err)
                } else {
                    movie = data;
                }
            });
        } catch (err) {
            logger.error('Mysql error', err);
            return res.status(500).send();
        }

        try {
            await peopleModel.getPeopleByMovieId("movie_actor", movieId, function(err, data) {
                if(err) {
                    console.log(err)
                } else {
                    movie["actors"] = data;
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
                    movie["directors"] = data;
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
                    movie["writers"] = data;
                    return res.status(200).json(movie);
                }
            })
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
                // Ajouter les détails acteurs...
                return res.json(data)
            }
        })
    })
    .delete(function(req, res) {
        const id = req.params.id;

        movieModel.deleteMovie(id, function(err, data) {
            if(err) {
                console.log(err)
            } else {
                return res.json(data)
            }
        });
    });

router.route('/')
    .all(function (req, res, next) {
        next();
    })
    .get(function(req, res, next) {
        movieModel.getAll(function(err, data) {
            if(err) {
                console.log(err)
            } else {
                return res.json(data)
            }
        })
    })
    .post(function (req, res, next) {
        const body = req.body;

        movieModel.createMovie(body, function(err, data) {
            if(err) {
                console.log(err)
            } else {
                // Ajouter les détails acteurs...
                return res.json(data)
            }
        })
    });

module.exports = router;