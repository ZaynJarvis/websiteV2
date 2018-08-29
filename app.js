const express = require("express"),
  bodyParser = require("body-parser"),
  app = express().use(bodyParser.json()),
  http = require("http"),
  https = require("https"),
  fs = require("fs"),
  cors = require("cors"),
  path = require("path");

// HTTPS setup
const options = {
  key: fs.readFileSync("../cert/zaynjarvis.com.key"),
  cert: fs.readFileSync("../cert/zaynjarvis_com.crt"),
  ca: fs.readFileSync("../cert/zaynjarvis_com.ca-bundle")
};

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

// Port setup
https.createServer(options, app).listen(443);
// Redirect from http port 80 to https
http
  .createServer(function(req, res) {
    res.writeHead(301, {
      Location: "https://" + req.headers["host"] + req.url
    });
    res.end();
  })
  .listen(80);

app.get("/api", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      title: "Notification",
      sub: "Thanks for using NTULearn Tweak",
      p: "The newest version now is 1.4.1",
      show: false
    })
  );
});
app.post("/api", (req, res) => {
  const content = req.body;
  console.log(content);
  res.json({ state: `success` });
});

// Routing
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});
