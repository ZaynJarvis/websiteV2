const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express().use(bodyParser.json());

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function(req, res) {
  res.sendFile("/index.html");
});

app.listen(9000);
