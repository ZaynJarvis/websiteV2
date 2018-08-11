import React, { Component } from "react";
const ics = require("ics");
const { writeFileSync } = require("fs");

const DAYTIME = 24 * 60 * 60 * 1000;
const WEEKTIME = 7 * DAYTIME;
// semester start at Aug. 13th. In js Date Format, month start on 0.
const semesterStart = new Date(2018, 7, 13, 0, 0, 0).getTime();

// external function to generate JSON file from website raw input.
const generateJSON = input => {
  // Data preprocessing
  // split the raw data into arrays of different courses.
  const DATA = input
    .trim()
    .split("\n")
    .filter(item => {
      return item[item.length - 1] !== "e";
    })
    .map(item => item.split("\t"));

  // From observation, every line of input with 15 fields is the course main information, which means it contains
  //    all the information "Course", "Title", "AU" etc..
  //    While the lines with only 7 or lower number of fields will only provide more information to complete the header line.
  //    For example, "Group type", "Day" etc...

  // In this step I push the "Course" in to Header list.
  const HEADER = DATA.reduce((list, itemCount) => {
    if (itemCount.length === 15) list.push(itemCount[0]);
    return list;
  }, []);

  // In later part I re-organize the content in Body part,
  // #1 put different partition together.
  // #2 calculate time

  // I declare variables here because I should not reinitialize them in my reduce loop.
  let type;
  let typeArr;
  let course;
  const BODY = DATA.reduce((obj, item) => {
    // In this case add a main course.
    if (item.length === 15) {
      obj[item[0]] = {};
      course = obj[item[0]];
      course.id = item[0];

      // delete first 9 items from the header, so the header and partition information has the same length.
      item.splice(0, 9);
      typeArr = [];
      // This define the course content part
      course.course = {};
      // This define the course time
      course.course.content = {};
    }

    // The result I get here is the first part of either "LAB" "LEC" "TUT", I don't really care what happens after "/".
    // For example, "LEC/STUDIO"
    // Hence, this part means the type of course.
    type = item[0].split("/")[0];
    // check if the type already exist.
    course.course.content[type] = course.course.content[type] || [];

    // To record the course type of certain course.
    // For example, a course can have "LEC" "TUT" & "LAB"
    if (!typeArr.includes(type)) {
      typeArr.push(type);
    }

    // This is the type in real course information,
    // It appeals in JSON result
    course.course.type = typeArr;

    // This part is time calculation. and detail information about certain class.
    course.course.content[type].push({
      location: item[4],
      group: item[1],
      // calculation of time, splite "k" because from observation, number always follow Week. "k"
      week: ((week = item[item.length - 1].split("k")[1]) => {
        // course week include "-" indicate range.
        if (week.includes("-")) {
          let weekArr = [];
          week = week.split("-");
          // push into week array.
          for (let i = Number(week[0]); i <= Number(week[1]); i++) {
            weekArr.push(i);
          }
          // concertain recess week, if week is larger than 7 add 1.
          // So week 8 does not exist.
          // This is for easier calculation on specific time of date of class.
          weekArr = weekArr.map(i => {
            if (i > 7) return parseInt(i, 10) + 1;
            else return i;
          });
          return weekArr;
        } else if (week.includes(","))
          // course week include "," indicate separate weeks.
          return (
            week
              .split(",")
              .map(i => parseInt(i.trim(), 10))
              // the same reason, no week 8
              .map(i => {
                if (i > 7) return parseInt(i, 10) + 1;
                return i;
              })
          );
        else return week <= 7 ? [week] : [parseInt(week, 10) + 1]; // indicate only one week course such as LAB.
      })(), // This is a IIFE (Immediately Invoked Function Expression) I use this callback function to return week value.

      // key is weekday, value is time. start to end
      weekday: item[2],
      courseTime: { [item[2]]: item[3].split("-") }
    });
    return obj;
  }, {});
  // --------------------------------
  // Why I use week instead of Dates?
  // This API is originally designed for setting up a self-designed calendar.
  // Hence, week information will be more specific to me.
  // For more information:
  // https://github.com/ZaynJarvis/ZaynJarvis.github.io
  // --------------------------------

  let result = {};
  result.courseList = HEADER;
  result.length = HEADER.length;
  result.courseContent = BODY;

  return result;
};

const generateCIS = source => {
  let serialEvent = [];
  source.week.forEach(weekNumber => {
    const event = {
      start: [2018, 8, 18, 5, 30],
      end: [],
      title: "test server",
      description: "Annual 10-kilometer run in Boulder, Colorado",
      location: "Folsom Field, University of Colorado (finish line)",
      geo: { lat: 1.29027, lon: 103.851959 },
      status: "CONFIRMED"
    };
  });

  ics.createEvent(event, (error, value) => {
    if (error) {
      console.log(error);
    }

    console.log(value);
    writeFileSync(`${__dirname}/event.ics`, value);
  });
};

const JSONtoCourseMiddleWare = jsonInput => {
  for (i = 0; i < jsonInput.length; i++) {
    const item = json.courseContent[json.courseList[i]];
    for (let courseType in item.course.type) {
      const matchContent = item.course.match[item.course.type[courseType]];
      for (t = 0; t < matchContent.length; t++) {
        generateCIS(
          item.id,
          item.course.type[courseType],
          item.course,
          matchContent[t]
        );
      }
    }
  }
};

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    // get the data, transfer to result
    const result = generateJSON(this.state.value);
    JSONtoCourseMiddleWare(result);
    // use the result to create .ics file.
    console.log(result);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  render() {
    return (
      <div id="contact" className="content">
        <div className="card">
          <div className="video">
            <iframe
              title="youtube video"
              src="https://www.youtube.com/embed/cI7A0OxPxVE?rel=0&amp;controls=0&amp;showinfo=0"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen="true"
            />
          </div>
          <div>
            <form id="myForm" autoComplete="off" onSubmit={this.handleSubmit}>
              <textarea
                name="input"
                id="user-input"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <input
                type="submit"
                className="generate"
                value="Click to Generate"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
