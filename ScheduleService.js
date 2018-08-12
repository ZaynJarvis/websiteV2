const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const JSONtoCourseMiddleWare = require("./icsHelper");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.send("hello");
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

// router.route("/store").post((req, res) => {
//   const content = req.body.content;
//   const fileName = req.body.file;
//   JSONtoCourseMiddleWare(content, fileName);
//   res.json({ file: `${fileName}.ics` });
// });

// app.use("/api", router);

app.listen(4430);
