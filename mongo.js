const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://ZaynJarvis:Liu!1234@ds233228.mlab.com:33228/chrome",
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on("error", console.log);
db.once("open", () => console.log("connected"));

const infoSchema = mongoose.Schema({
  school: String,
  name: String,
  title: String,
  sub: String,
  p: String,
  show: Boolean,
  date: Number
});

const userSchema = mongoose.Schema({
  school: String,
  name: String
});

module.exports = { Info: mongoose.model("infos", infoSchema), User: mongoose.model("users", userSchema) };
