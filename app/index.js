const express = require('express'),
    app = express(),
    port = process.argv[2] || 3000,
    bodyParser = require('body-parser');

// Define Swagger
const swaggerUi = require("swagger-ui-express"),
    swaggerDocument = require('../resources/swagger.json');

// Define routers
const movieRouter = require('./routers/movieRouter'),
    genreRouter = require('./routers/genreRouter'),
    peopleRouter = require('./routers/peopleRouter'),
    reviewRouter = require('./routers/reviewRouter');

// Configure the body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure response headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-API-KEY, Content-Type, Accept");
    next();
});

// Configure Swagger route
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Match routers to routes
app.use('/movies', movieRouter);
app.use('/genres', genreRouter);
app.use('/people', peopleRouter);
app.use('/reviews', reviewRouter);

// Launch server
app.listen(port, () => console.log(`TEST Server running at http://127.0.0.1:${port}`));
