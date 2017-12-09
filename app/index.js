const express = require('express'),
    app = express(),
    port = process.argv[2] || 3000,
    bodyParser = require('body-parser');

// import de swagger
const swaggerUi = require("swagger-ui-express"),
    swaggerDocument = require('../resources/swagger.json');

// importer les routeurs
const movieRouter = require('./routers/movieRouter'),
    genreRouter = require('./routers/genreRouter'),
    peopleRouter = require('./routers/peopleRouter'),
    reviewRouter = require('./routers/reviewRouter');

// Configure the application.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-API-KEY, Content-Type, Accept");
    next();
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// attribuer les routes aux routeurs
app.use('/movies', movieRouter);
app.use('/genres', genreRouter);
app.use('/people', peopleRouter);
app.use('/reviews', reviewRouter);

// lancement du serveur
app.listen(port, () => console.log(`TEST Server running at http://127.0.0.1:${port}`));
