const express = require("express"),
  bodyParser = require("body-parser"),
  app = express().use(bodyParser.json());
const https = require("https");
const http = require("http");
const fs = require("fs");
const options = {
  key: fs.readFileSync("../cert/zaynjarvis.com.key"),
  cert: fs.readFileSync("../cert/zaynjarvis_com.crt"),
  ca: fs.readFileSync("../cert/zaynjarvis_com.ca-bundle")
};

https.createServer(options, app).listen(443);
app.use(express.static(path.join(__dirname, "build")));
// Redirect from http port 80 to https
http
  .createServer(function(req, res) {
    res.writeHead(301, {
      Location: "https://" + req.headers["host"] + req.url
    });
    res.end();
  })
  .listen(80);

app.get("/", function(request, response) {
  response.sendFile("/index.html");
});
