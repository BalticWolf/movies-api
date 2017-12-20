# Introduction
This API was developed in the frame of my developer training at IMIE.
We initially worked together with [Sarah](https://github.com/nougatinelisa) and [Thierry](https://github.com/ThierryChampot).
Then I chose to fork the project and finish it on my own free time.

# About
This is a Node.js API to manage movies and associated data (actors, genres, reviews, etc...).
The data model and data were given by our teacher. Both could be improved, but that is not the purpose here.

# Guidelines
### General
1. Clone the project: `git clone <repository>`
1. Get all the necessary node_modules: `npm install`
### Database
1. Create and populate the database; the sql script is located in `/resources/movies_imie.sql`
1. Create your own `/config` folder at the project root
1. Copy the `configTemplate.js` file from `/resources` to `/config`
1. Rename the copied file to `config.js`
1. Change the parameters values in the `database` key
### Test the api
1. Launch your MySQL database server
1. Type `npm start` in you Terminal
1. Open your web browser
1. Reach for the [swagger](https://swagger.io/docs/specification/about/) route (ex: `http://<host>:<port>/swagger`)
1. Start using the swagger