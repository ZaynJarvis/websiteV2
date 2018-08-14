export default function generateJSON(input) {
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
      course.title = item[1];
      course.au = item[2];

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
          if (week.length === 2) {
            // push into week array.
            for (let i = Number(week[0]); i <= Number(week[1]); i++) {
              weekArr.push(i);
            }
          } else {
            for (
              let i = Number(week[0]);
              i <= Number(week[week.length - 1]);
              i++
            ) {
              weekArr.push(i);
            }
            let deleteNum = week[1].split(",");
            for (
              let i = Number(deleteNum[0]) + 1;
              i < Number(deleteNum[1]);
              i++
            ) {
              const index = weekArr.indexOf(i);
              weekArr.splice(index, 1);
            }
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
                return parseInt(i, 10);
              })
          );
        else return week <= 7 ? [parseInt(week, 10)] : [parseInt(week, 10) + 1]; // indicate only one week course such as LAB.
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
}
