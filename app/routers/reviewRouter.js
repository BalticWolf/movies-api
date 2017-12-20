const express = require('express');
const router = express.Router();
const connection = require('../dbConnector');
const ReviewModel = require('../models/reviewModel');

const reviewModel = new ReviewModel(connection);

router.route('/:id')
    .put(function(req, res) {
        const id = parseInt(req.params.id);
        const body = req.body;

        reviewModel.updateReview(id, body, function(err, data) {
            if(err) {
                console.log(err)
            } else {
                return res.status(200).json(data)
            }
        });
    })
    .delete(function(req, res) {
        const id = parseInt(req.params.id);

        reviewModel.deleteReview(id, function(err, data) {
            if(err) {
                console.log(err)
            } else {
                return res.status(204).json(data)
            }
        });
    });

router.route('/')
    .post(function(req, res) {
        const body = req.body;
        reviewModel.createReview(body, function(err, data) {
            if(err) {
                console.log(err)
            } else {
                return res.json(data)
            }
        });
    });

module.exports = router;
