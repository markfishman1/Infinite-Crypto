class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        //By doing the parent call with super, we set the error message to our incoming message
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
