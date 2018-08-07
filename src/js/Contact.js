import React, { Component } from "react";
import TypeForm from "./TypeForm";
class Contact extends Component {
  componentDidUpdate() {
    console.log("update");
  }
  componentDidMount() {}
  render() {
    return (
      <div id="contact" className="content">
        <div className="card">
          <div className="card-form">
            <TypeForm />
          </div>
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
