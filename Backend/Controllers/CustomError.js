const CustomError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
    error.isOperational = true;
    Error.captureStackTrace(error, CustomError);
    return error;
};

module.exports = CustomError;