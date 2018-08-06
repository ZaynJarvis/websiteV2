import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div id="home">
        <h1 className="lg-heading">
          Zhiheng&nbsp;
          <span className="text-highlight">Liu</span>
        </h1>
        <h2 className="sm-heading">Innovator, Student &amp; Trainer</h2>
        <div className="icons">
          <div className="icon">
            <a
              href="https://github.com/ZaynJarvis"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github fa-2x" />
            </a>
          </div>
          <div className="icon">
            <a
              href="https://www.instagram.com/ZaynJarvis/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram fa-2x" />
            </a>
          </div>
          <div className="icon">
            <a
              href="https://www.youtube.com/channel/UCGZbRK9E7v_FccSOKIqZAaQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube fa-2x" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
