module.exports = (err, req, res, next) => {
    const type = err.name;

    switch (type) {
        case 'TokenExpiredError':
        case 'JsonWebTokenError':
        case 'NotBeforeError':
            res.status(401);
            break;
        default:
            res.status(500);
    }

    console.error(err);

    return res.json({
        error: true,
        type
    });
}