module.exports = (err, req, res, next) => {
    console.log(err.stack);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // if (process.env.NODE_ENV === 'development') {
    //     sendErrorDev(err, res);
    // } else if (process.env.NODE_ENV === 'production') {
    //     let error = { ...err };

    //     if (error.name === 'CastError') error = handleCastErrorDB(error);
    //     // else if (error.name === '')
    //     sendErrorProd(error, res);
    // }
};
