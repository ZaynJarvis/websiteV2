const ics = require("ics");
// The ics API use UTC-8 as the only time source, hence we will use UTC time to calculate timezone.

// By calculation time offset is +8 Hours
// Since I use UTC as standard time, hour and minutes is in Singapore timezone (UTC+8)
// Hence, when it apply to UTC time the real time offset is -8 Hours
// Then I import the time to ics API, which use UTC-8 as standard.
// Hence There is a +16 Hours Offset.
// In total it is a +8 Hours Offset.

const DAYTIME = 24 * 60 * 60 * 1000,
  OFFSET = 8 * 60 * 60 * 1000,
  WEEKTIME = 7 * DAYTIME,
  WEEKDAY = {
    MON: 0,
    TUE: 1,
    WED: 2,
    THU: 3,
    FRI: 4,
    SAT: 5,
    SUN: 6
  },
  semesterStart = new Date(2018, 7, 13, 0, 0, 0, 0).getTime(); // Semester start uses UTC time
// JS Date module use 0 as the start of month, hence, 0 stands for January.

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

export default function JSONtoCourseMiddleWare(jsonInput) {
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
  if (!error) return value;
}
