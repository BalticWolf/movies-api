const express = require('express');
const router = express.Router();
const connection = require('../dbConnector');
const PeopleModel = require('../models/peopleModel');

const peopleModel = new PeopleModel(connection);

router.route('/:id')
    .put(function(req, res) {
        const id = parseInt(req.params.id);
        const body = req.body;

        peopleModel.updatePerson(id, body, function(err, data) {
            if(err) {
                console.log(err)
            } else {
                return res.status(200).json(data)
            }
        });
    })
    .delete(function(req, res) {
        const id = parseInt(req.params.id);

        peopleModel.deletePerson(id, function(err, data) {
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
        peopleModel.getAll(function(err, data) {
            if(err) {
                console.log(err)
            } else {
                return res.status(200).json(data)
            }
        })
    })
    .post(function (req, res) {
        const body = req.body;

        peopleModel.createPerson(body, function(err, data) {
            if(err) {
                console.log(err)
            } else {
                return res.status(201).json(data)
            }
        })
    });

module.exports = router;
