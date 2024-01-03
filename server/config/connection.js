const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONN_URL);

module.exports = mongoose.connection;