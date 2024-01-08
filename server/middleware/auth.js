const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.headers.authorization.split(' ').pop().trim();

    jwt.verify(token, process.env.JWT_SECRET, next);
}
