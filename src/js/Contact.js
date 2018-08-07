import React, { Component } from "react";
import * as typeformEmbed from "@typeform/embed";
class Contact extends Component {
  constructor(prop) {
    super(prop);
    this.typeFormPopup = this.typeFormPopup.bind(this);
    // const typeFormReference;
    this.typeFormReference = typeformEmbed.makePopup(
      "https://zaynjarvis.typeform.com/to/msw805",
      {
        mode: "popup",
        hideHeaders: true,
        hideFooters: true,
        onSubmit: () =>
          setTimeout(() => {
            this.typeFormReference.close();
          }, 5000)
      }
    );
  }
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
        buttonText: "Start Now!",
        onSubmit: function() {
          console.log("Typeform successfully submitted");
        }
      }
    );
  }

  typeFormPopup() {
    this.typeFormReference.open();
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
            <button id="message" onClick={this.typeFormPopup}>
              Send a Message
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
