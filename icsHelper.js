const ics = require("ics");
const fs = require("fs");

const DAYTIME = 24 * 60 * 60 * 1000;
const OFFSET = 16 * 60 * 60 * 1000;
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
const semesterStart = new Date("August 13, 2018 00:00:00 GMT+08:00").getTime();

const dateCalculation = (d, T) => {
  const original = new Date(
    parseInt(d.getFullYear(), 10),
    parseInt(d.getMonth(), 10),
    parseInt(d.getDate(), 10),
    parseInt(T.slice(0, 2), 10),
    parseInt(T.slice(2, 4), 10),
    0,
    0
  ).getTime();

  const calibrated = new Date(original + OFFSET);

  return [
    parseInt(calibrated.getFullYear(), 10),
    parseInt(calibrated.getMonth(), 10) + 1,
    parseInt(calibrated.getDate(), 10),
    parseInt(calibrated.getHours(), 10),
    parseInt(calibrated.getMinutes(), 10)
  ];
};

const generateCIS = (item, courseType, targetJson) => {
  let serialEvent = [];
  targetJson.week.forEach(weekNumber => {
    const time =
      semesterStart +
      (weekNumber - 1) * WEEKTIME +
      WEEKDAY[targetJson.weekday] * DAYTIME;

    const event = {
      start: dateCalculation(
        new Date(time),
        targetJson.courseTime[targetJson.weekday][0]
      ),
      end: dateCalculation(
        new Date(time),
        targetJson.courseTime[targetJson.weekday][1]
      ),
      title: item.id,
      description: item.title + "\n" + courseType + " " + targetJson.group,
      categories: ["NTU course"],
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
          generateCIS(item, item.course.type[courseType], matchContent[t])
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
