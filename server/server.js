require('dotenv').config();
const express = require('express');

const User = require('./models/User.js')

const app = express();
const db = require('./config/connection.js');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
    app.listen(process.env.SERVER_PORT, async () => {
        console.log('DB connection successful at', process.env.DB_CONN_URL);
        console.log('Express server listening on port', process.env.SERVER_PORT);
    });
});