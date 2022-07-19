const allowedOrigins = require('./allowedOrigins');

const credentials = (req, res, next) => {
    // const origin = req.headers.host;
    // console.log(req.headers.origin);
    // if (allowedOrigins.includes(origin)) {
    //     res.header("Access-Control-Allow-Credentials", true);
    // }


    //above code not working req.headers.origin is undefined
    res.header("Access-Control-Allow-Credentials", true);
    next();
};

module.exports = credentials;