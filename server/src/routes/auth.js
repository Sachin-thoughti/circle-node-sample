var express = require("express");
var router = express.Router();
var helpers = require("../helpers/helpers");

router.post("/login", (req, res) => {
  return helpers.generateApiResponse(res, req, "POST /login HTTP/1.1", 200, []);
});

router.post("/register", (req, res) => {
  return helpers.generateApiResponse(
    res,
    req,
    "POST /register HTTP/1.1",
    200,
    []
  );
});

router.post("/logout", (req, res) => {
  return helpers.generateApiResponse(
    res,
    req,
    "POST /logout HTTP/1.1",
    200,
    []
  );
});

module.exports = router;
