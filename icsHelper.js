const ics = require("ics");
const fs = require("fs");

const DAYTIME = 24 * 60 * 60 * 1000;
const WEEKTIME = 7 * DAYTIME;
const WEEKDAY = {
  MON: 0,
  TUE: 1,
  WED: 2,
  THU: 3,
  FRI: 4,
  SAT: 5,
  SUN: 6
};
// semester start at Aug. 13th. In js Date Format, month start on 0.
const semesterStart = new Date(2018, 7, 13, 0, 0, 0).getTime();

const generateCIS = (id, courseType, targetJson) => {
  let serialEvent = [];
  targetJson.week.forEach(weekNumber => {
    const time =
      semesterStart +
      (weekNumber - 1) * WEEKTIME +
      WEEKDAY[targetJson.weekday] * DAYTIME;

    const d = new Date(time);
    const Y = parseInt(d.getFullYear(), 10);
    const M = parseInt(d.getMonth(), 10) + 1;
    const D = parseInt(d.getDate(), 10);

    const x = targetJson.courseTime[targetJson.weekday][0];

    const y = targetJson.courseTime[targetJson.weekday][1];

    const event = {
      start: [
        Y,
        M,
        D,
        parseInt(x.slice(0, 2), 10),
        parseInt(x.slice(2, 4), 10)
      ],
      end: [Y, M, D, parseInt(y.slice(0, 2), 10), parseInt(y.slice(2, 4), 10)],
      title: id,
      description: courseType + " " + targetJson.group,
      location: targetJson.location,
      geo: { lat: 1.29027, lon: 103.851959 },
      status: "CONFIRMED"
    };
    ics.createEvent(event, (error, value) => {
      if (error) {
        console.log("why" + error);
        console.log(weekNumber);
      } else {
        serialEvent.push(event);
      }
    });
  });
  return serialEvent;
};

function JSONtoCourseMiddleWare(jsonInput, fileName) {
  let eventArray = [];
  for (let i = 0; i < jsonInput.length; i++) {
    const item = jsonInput.courseContent[jsonInput.courseList[i]];
    for (let courseType in item.course.type) {
      const matchContent = item.course.content[item.course.type[courseType]];
      for (let t = 0; t < matchContent.length; t++) {
        eventArray = eventArray.concat(
          generateCIS(item.id, item.course.type[courseType], matchContent[t])
        );
      }
    }
  }
  const { error, value } = ics.createEvents(eventArray);
  console.log(error);
  fs.writeFile(__dirname + `/file/${fileName}.ics`, value, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}

module.exports = JSONtoCourseMiddleWare;
