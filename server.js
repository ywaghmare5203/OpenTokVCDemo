const express = require("express");
const bodyParser = require("body-parser");

/*
 * Config
 */
const app = express();
const port = process.env.PORT || 8080;
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

const winston = require('winston')
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)

function logRequest(req, res, next) {
    logger.info(req.url)
    next()
}
app.use(logRequest)

function logError(err, req, res, next) {
    logger.error(err)
    next()
}
app.use(logError)

/*
 * User Routes
 */

app.get("/", (req, res) => {
  res.sendfile("public/index.html");
});

/*
 * Listen
 */
app.listen(process.env.PORT || port);
console.log(`app listening on port ${port}`);