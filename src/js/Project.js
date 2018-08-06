import React, { Component } from "react";

class Project extends Component {
  render() {
    return (
      <div id="project" className="content">
        <h1 className="lg-heading">
          My&nbsp;
          <span className="text-highlight">Projects</span>
        </h1>

        <div className="projects">
          <div className="project">
            <h3>Front-End Development</h3>
            <span className="icon">
              <a
                href="https://github.com/ZaynJarvis/ZaynJarvis.github.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github fa-2x" />
              </a>
            </span>
            <p>
              I start my journey on front-end web development with my previous
              experience in Photoshop. I created my first static GitHub page and
              online resume. I designed a course schedule planner using JS. It
              will change the pure text content to a dynamic schedule. Now, I am
              trying to add more user interactions.
            </p>
          </div>
          <div className="project">
            <h3>Back-End Development</h3>
            <span className="icon">
              <a
                href="https://github.com/SDIAcademy/backend"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github fa-2x" />
              </a>
            </span>
            <p>
              I created a mobile APP prototype, Dr. English, in which projects I
              coordinate with NodeJS, ExpressJS, Android Speech Recognition
              Docker, Kubernetes, and Firebase.
            </p>
          </div>
          <div className="project">
            <h3>Telegram Chatbot Project</h3>
            <span className="icon">
              <a
                href="https://github.com/ZaynJarvis/Telegram-Chatbot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github fa-2x" />
              </a>
            </span>
            <p>
              I self-learned Python since course materials are not enough, and
              led a team of six for a Telegram Bot project. The chatbot is an
              integrated data management system for student associations. My
              Github repo includes the complete source code and documentation
            </p>
          </div>
          <div className="project">
            <h3>Processing &amp; p5.js</h3>
            <p>
              I started learning Processing by watching Mr. Shiffman’s youtube
              tutorials. Rather than animation by CSS and Animate.js, p5.js
              gives the freedom to generate visual art, animation, and
              interaction.
            </p>
          </div>
          <div className="project">
            <h3>Internet &amp; Training</h3>
            <p>
              I bought a domain name, SSL certificate and created my server on
              DigitalOcean, and learned Linux command line, Git, Github, ssh,
              VPN, and became the software trainer of Garage@EEE and NTUOSS.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
