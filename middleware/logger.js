const logger = (req, res, next) => {
    ("**********logger middleware***********************")
    console.log(`A new ${req.method} request was received on the ${req.url} endpoint! MIDDLEWARE: logger.js`);

    next();    
}

export default logger;