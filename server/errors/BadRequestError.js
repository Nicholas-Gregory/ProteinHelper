module.exports = class BadRequestError extends Error {
    constructor(...params) {
        super(...params);

        this.name = 'BadRequestError';
    }
}