require('dotenv').config({ path: '/var/www/html/hae/server/.env'});
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var helmet = require("helmet");
var morgan = require("morgan");
var helpers = require("./helpers/helpers");

var app = express();

var router = require("./routes");

const APP_PORT = process.env.APP_PORT || 5000;
const APP_URL = process.env.APP_URL || `http://localhost:${APP_PORT}`;
const CLIENT_URL = process.env.CLIENT_URL || `http://localhost:3000`;

// adding Helmet to enhance your API's security
app.use(
  helmet({
    frameguard: false
  })
);

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json({ limit: "50mb" }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// enabling CORS for all requests
// app.use(cors({ credentials: true, origin: true }));
app.use(cors());

// eslint-disable-next-line eqeqeq
if (process.env.NODE_ENV != "production") {
  // adding morgan to log HTTP requests
  app.use(morgan("combined"));
}

// import router
app.use(router);
app.use((req, res, next) => {
  const err = new Error(process.env.ERR_404);
  err.status = 404;
  next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  let errCode = err.status || 501;
  return helpers.generateApiResponse(res, req, err.message, errCode, err);
});

// create http server without self self-signed SSL cerificate
let http = require("http");
const server = http.createServer(app);

// starting the server
server.listen(APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    "\nApp Environment: " +
      APP_PORT +
      "\nServer now running on " +
      APP_URL +
      "\nClient running on " +
      CLIENT_URL +
      "\n"
  );
});
