var courseContent = {};
var json = {};

/* time effect */
const DAYTIME = 24 * 60 * 60 * 1000;
const WEEKTIME = 7 * DAYTIME;
var timeNow = new Date().getTime();
var time = new Date(2018, 7, 13, 0, 0, 0).getTime();
var week = 0;
while (timeNow > time) {
  time += WEEKTIME;
  week++;
}

var dateTimeNow = timeNow - (time - WEEKTIME);
var weekday = Math.ceil(dateTimeNow / DAYTIME);
var fraction = (dateTimeNow / DAYTIME + 1 - weekday) * 100;
var timetableFraction = 0;
var dayTimeNow = (dateTimeNow % DAYTIME) / 1000;
if (dayTimeNow > 8 * 3600 + 30 * 60) {
  if (dayTimeNow < 19 * 3600)
    timetableFraction =
      5 + ((dayTimeNow - (8 * 3600 + 30 * 60)) / (11 * 3600 - 30 * 60)) * 95;
  else timetableFraction = 100;
}
if (!(weekday === 6 || weekday === 7))
  document.getElementsByClassName("title")[weekday].style.background =
    "linear-gradient(90deg,rgba(27,27,27,0.4) 0%,rgba(108,95,105,0.8) " +
    fraction +
    "%,rgba(27,27,27,0.4) 100%)";
else week++;

document.getElementById("week").innerHTML += week > 7 ? week - 1 : week;

//--------------------------------------------------------------
for (i = 0; i < json.length; i++) {
  var item = json.courseContent[json.courseList[i]];
  for (let courseType in item.course.type) {
    let matchContent = item.course.match[item.course.type[courseType]];
    for (t = 0; t < matchContent.length; t++) {
      formHTML(
        item.id,
        item.course.type[courseType],
        item.course,
        matchContent[t]
      );
    }
  }
}

function formHTML(id, courseType, source, targetJson) {
  let weekOn = Object.keys(targetJson.courseTime);
  function calculate(element) {
    //calculate the fraction for css style sheet.
    return (
      (element[weekOn[k]][0].replace("30", ".5").replace("00", "") - 8.5) * 2 +
      1 +
      "/" +
      ((element[weekOn[k]][1].replace("30", ".5").replace("00", "") - 8.5) * 2 +
        1)
    );
  }
  for (k = 0; k < weekOn.length; k++) {
    let targetWeekDay = document.getElementById(weekOn[0]);
    let showing = "none";
    for (var actWeek in targetJson.week) {
      targetJson.week[actWeek] == week ? (showing = "") : (showing = showing);
    }
    let targetTime = calculate(targetJson.courseTime);
    targetWeekDay.innerHTML += `<div id="${
      item.id
    }" style = "grid-row: ${targetTime}; display:${showing}">${id} ${courseType} ${
      targetJson.group
    }<br>${targetJson.location}</div>`;
  }
}
