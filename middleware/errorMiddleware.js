  const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
    // Custom error handling for MongoDB & Validation
    if (err.name === "ValidationError") {
      statusCode = 400;
    }
    
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  };
  
  export default errorHandler;
  