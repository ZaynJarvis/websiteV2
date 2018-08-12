import React, { Component } from "react";
import generateJSON from "./tools/generateJSON";
// external function to generate JSON file from website raw input.

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const fileName = Math.random()
      .toString(36)
      .substring(2);
    // get the data, transfer to result
    const result = generateJSON(this.state.value);
    // send the result to the server
    fetch("https://zaynjarvis.com/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ content: result, file: fileName })
    })
      .then(function(res) {
        console.log(res);
        res.json().then(body => {
          window.open("https://zaynjarvis.com/download?file=" + body.file);
        });
      })
      .catch(function(error) {
        console.log("Request failure: ", error);
      });
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
              src="https://www.youtube.com/embed/svTCpjJvONY?rel=0&amp;controls=0&amp;showinfo=0"
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
