import React, { Component } from "react";

class Contact extends Component {
  componentDidMount() {
    (function() {
      var qs,
        js,
        q,
        s,
        d = document,
        gi = d.getElementById,
        ce = d.createElement,
        gt = d.getElementsByTagName,
        id = "typef_orm",
        b = "https://embed.typeform.com/";
      if (!gi.call(d, id)) {
        js = ce.call(d, "script");
        js.id = id;
        js.src = b + "embed.js";
        q = gt.call(d, "script")[0];
        q.parentNode.insertBefore(js, q);
      }
    })();
  }
  render() {
    return (
      <div id="contact" className="content">
        <div className="card">
          <div className="card-form">
            <div
              class="typeform-widget"
              data-url="https://zaynjarvis.typeform.com/to/msw805"
            />
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
