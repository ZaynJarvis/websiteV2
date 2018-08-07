import React, { Component } from "react";
import * as typeformEmbed from "@typeform/embed";
class Contact extends Component {
  componentDidUpdate() {
    this.typeForm();
  }
  componentDidMount() {
    this.typeForm();
  }

  typeForm() {
    const embedElement = document.querySelector(".card-form");

    typeformEmbed.makeWidget(
      embedElement,
      "https://zaynjarvis.typeform.com/to/msw805",
      {
        hideHeaders: true,
        hideFooter: true,
        opacity: 100,
        buttonText: "Take the survey!",
        onSubmit: function() {
          console.log("Typeform successfully submitted");
        }
      }
    );
  }
  render() {
    return (
      <div id="contact" className="content">
        <div className="card">
          <div className="card-form" />
          <div className="card-info">
            <h3 className="formal">Contact Information</h3>
            <p>
              10 Nanyang Dr,<br />Singapore 637720<br />Liu Zhiheng
            </p>
            <p>
              <i>Call me: +65 8309-9012</i>
              <br />Email me: zaynjarvis@gmail.com
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
