const express = require('express');
const router = express.Router();
const connection = require('../dbConnector');
const GenresModel = require('../models/genresModel');


const genresModel = new GenresModel(connection);

// réponse à l'url "/genres"
router.get('/', function(req, res) {
    genresModel.getAll(function(err, data) {
        if(err) {
            console.log(err)
        } else {
            return res.json(data)
        }
    })
});

module.exports = router;