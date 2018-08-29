const express = require("express"),
  bodyParser = require("body-parser"),
  app = express().use(bodyParser.json()),
  http = require("http"),
  https = require("https"),
  fs = require("fs"),
  cors = require("cors"),
  path = require("path");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://ZaynJarvis:Liu!1234@ds233228.mlab.com:33228/chrome"
);

const db = mongoose.connection;
db.on("error", console.log);
db.once("open", () => console.log("connected"));

const infoSchema = mongoose.Schema({
  title: String,
  sub: String,
  p: String,
  show: Boolean
});

const Info = mongoose.model("info", infoSchema);

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

  const info = new User({
    title: content.title,
    sub: content.sub,
    p: content.p,
    show: content.show
  });

  info.save((err, info) => {
    if (err) res.json({ state: `success` });
    else res.json({ state: `failed` });
  });
});

// Routing
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});
