import React, { Component } from "react";
import generateJSON from "./tools/generateJSON";
import JSONtoCourseMiddleWare from "./tools/icsHelper";
// external function to generate JSON file from website raw input.

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  handleSubmit(event) {
    event.preventDefault();
    // get the data, transfer to result
    const jsonFormatedInfo = generateJSON(this.state.value);
    // send the result to the server
    const courseResult = JSONtoCourseMiddleWare(jsonFormatedInfo);

    this.download(courseResult, "Schedule.ics", "text/plain");
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
              src="https://www.youtube.com/embed/f1ZH-x-mTiM?rel=0&amp;showinfo=0"
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
                value="Testing Mode"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
