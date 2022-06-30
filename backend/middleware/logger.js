const logger = (req, res, next) => {
    console.log(`A new ${req.method} request was received on the ${req.url} endpoint!`);

    next();    
}

export default logger;