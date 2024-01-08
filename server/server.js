require('dotenv').config();
const express = require('express');

const { err } = require('./middleware');
const routes = require('./routes');

const app = express();
const db = require('./config/connection.js');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.use(err);

db.once('open', async () => {
    app.listen(process.env.SERVER_PORT, async () => {
        console.log('DB connection successful at', process.env.DB_CONN_URL);
        console.log('Express server listening on port', process.env.SERVER_PORT);
    });
});