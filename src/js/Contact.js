import React, { Component } from "react";
import * as typeformEmbed from "@typeform/embed";
class Contact extends Component {
  constructor(prop) {
    super(prop);
    this.typeFormPopup = this.typeFormPopup.bind(this);
    this.typeForm = this.typeForm.bind(this);
    this.state = {
      showThankyou: false
    };
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
    this.embedElement = React.createRef();
  }
  componentDidUpdate() {
    this.embedElement.current.innerHTML = "";
    this.typeForm();
  }
  componentDidMount() {
    this.typeForm();
  }

  typeForm() {
    typeformEmbed.makeWidget(
      this.embedElement.current,
      "https://zaynjarvis.typeform.com/to/msw805",
      {
        hideHeaders: true,
        hideFooter: true,
        opacity: 100,
        buttonText: "Start Now!",
        onSubmit: () =>
          setTimeout(() => this.setState({ showThankyou: true }), 8000)
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
          <div
            className={this.state.showThankyou ? "dead card-form" : "card-form"}
            ref={this.embedElement}
          />
          <div
            className={
              this.state.showThankyou ? "card-thank " : "card-thank dead"
            }
          >
            <h1 className="lg-heading">Thank you !!</h1>
            <button
              className="message message-pc"
              onClick={() => this.setState({ showThankyou: false })}
            >
              Send another Message
            </button>
          </div>
          <div className="card-info">
            <h3 className="formal">Contact Information</h3>
            <p>
              10 Nanyang Dr,
              <br />
              Singapore 637720
              <br />
              Liu Zhiheng
            </p>
            <p>
              <i>Call me: +65 8309-9012</i>
              <br />
              Email me: zaynjarvis@gmail.com
            </p>
            <button
              className="message message-mobile"
              onClick={this.typeFormPopup}
            >
              Send a Message
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
