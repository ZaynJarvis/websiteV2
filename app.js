const express = require("express"),
  bodyParser = require("body-parser"),
  app = express().use(bodyParser.json()),
  http = require("http"),
  https = require("https"),
  fs = require("fs"),
  cors = require("cors"),
  path = require("path");
const Mongo = require("./mongo");
const User = Mongo.User;
const Info = Mongo.Info;

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
  .createServer(function (req, res) {
    res.writeHead(301, {
      Location: "https://" + req.headers["host"] + req.url
    });
    res.end();
  })
  .listen(80);

function respond(err, result, res) {
  if (result)
    res.send(
      JSON.stringify({
        title: result.title,
        sub: result.sub,
        p: result.p,
        show: result.show
      })
    );
  else
    res.send({});
}
app.get("/api", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (req.query.name !== undefined && req.query.name !== "") {
    Info.findOne(req.query, {}, { sort: { date: -1 } }, (e, v) => respond(e, v, res));
    const user = new User({
      school: req.query.school,
      name: req.query.name,
      count: 0
    });
    User.findOne(req.query, {}, { sort: { date: -1 } }, (e, v) => {
      if (!v) {
        user.save((e, v) => { console.log(e) });
      }
      else {
        v.count += 1;
        User.updateOne({ name: v.name }, { "$set": { count: v.count } }, (e, v) => { console.log(e); });
      }
    });
  }
  else if (Object.keys(req.query).length !== 0)
    Info.findOne({ school: req.query.school, name: "" }, {}, { sort: { date: -1 } }, (e, v) => respond(e, v, res));
  else
    Info.findOne({ school: "all" }, {}, { sort: { date: -1 } }, (e, v) => respond(e, v, res));
});

app.post("/api", (req, res) => {
  const content = req.body;
  const info = new Info({
    school: content.school,
    name: content.name,
    title: content.title,
    sub: content.sub,
    p: content.p,
    show: content.show,
    date: new Date().getTime()
  });
  Info.findOne({
    school: content.school,
    name: content.name
  }, {}, { sort: { date: -1 } }, (e, v) => {
    if (e) console.log(e);
    else if (!v) {
      info.save((e, v) => { if (e) console.log(e) });
    }
    else {
      Info.updateOne({
        school: content.school,
        name: content.name
      }, info, (e, v) => { if (e) console.log(e); });
    }
  });
  info.save((err, info) => {
    if (err) res.json({ state: err });
    else res.json({ state: `successed` });
  });
});

// Routing
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});
