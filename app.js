const express = require("express"),
  bodyParser = require("body-parser"),
  app = express().use(bodyParser.json());
const https = require("https");
const http = require("http");
const router = express.Router();
const JSONtoCourseMiddleWare = require("./icsHelper");
const fs = require("fs");
const cors = require("cors");

const path = require("path");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

app.get("/", (req, res) => {
  res.sendFile("/index.html");
});
app.get("/about", (req, res) => {
  res.sendFile("/index.html");
});
app.get("/project", (req, res) => {
  res.sendFile("/index.html");
});
app.get("/contact", (req, res) => {
  res.sendFile("/index.html");
});
app.get("/calendar", (req, res) => {
  res.sendFile("/index.html");
});

app.get("/download", (req, res) => {
  var file = req.query.file;
  var fileLocation = path.join(__dirname, "file", file);
  res.download(fileLocation, "Schedule.ics");
});

app.post("/store", (req, res) => {
  const content = req.body.content;
  const fileName = req.body.file;
  JSONtoCourseMiddleWare(content, fileName);
  res.json({ file: `${fileName}.ics` });
});

app.get("/test", (req, res) => {
  res.send("test");
});

app.get("/download", (req, res) => {
  var file = req.query.file;
  var fileLocation = path.join(__dirname, "file", file);
  res.download(fileLocation, "Schedule.ics");
});
