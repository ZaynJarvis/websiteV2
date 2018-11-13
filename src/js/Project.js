import React, { Component } from "react";

class Project extends Component {
  render() {
    return (
      <div id="project" className="content">
        <h1 className="lg-heading">
          My&nbsp;
          <span className="text-highlight">Projects</span>
        </h1>
        <h1 className="sm-heading">
          <span className="text-highlight">
            Ask problems as an innovator, and solve problems as an engineer.
          </span>
        </h1>
        <div className="projects">
          <div className="project project-text">
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
              integrated data management system for student associations. The
              project is a prototype for the school event management platform
              [WIP] Tribe.
            </p>
          </div>
          <div className="project project-text">
            <h3>Front-End Development</h3>
            <span className="icon">
              <a
                href="https://zaynjarvis.github.io/VanillaCalendar/"
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
              will change the pure text content to a dynamic schedule.
            </p>
          </div>
          <div className="project project-text">
            <h3>NTUVibe</h3>
            <span className="icon">
              <a
                href="https://ntuvibe.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github fa-2x" />
              </a>
            </span>
            <p>
              NTUVibe is a course review and discussion platform for NTU
              students. I took part in this student initiated project and design
              a program to generate the .ics file to help users import their
              calendar on their mobile devices. This project benefits a lot of
              NTU undergraduates.
            </p>
          </div>
          <div className="project project-text">
            <h3>NTUlearn Tweak</h3>
            <span className="icon">
              <a
                href="https://www.youtube.com/playlist?list=PLauyMbJD3fIl5-Mbh9bRaHJ1UzFAUv0E5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github fa-2x" />
              </a>
            </span>
            <p>
              This self-initiated open source project is to redesign the course
              website of NTU. I create a Chrome Extension to change NTULearn's
              user interface and upload the showcase and tutorials for using
              Chrome Extensions. Hopefully, lots of NTU undergrads will benefit
              from this project.
            </p>
          </div>
          <div className="project project-text">
            <h3>FYP Consultant</h3>
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
              I am working with NTU EEE undergraduates office on an automated
              course planning platform. The outcome of the project will ease the
              work load for EEE stuff, and have potential commercial value to
              sale to other school and university. This project is a FYP project
              of Ding Jin. I am assigned to be her consultant for the entire
              project under EEE supervision.
            </p>
          </div>

          <div className="project project-text">
            <h3>One-NTU</h3>
            <span className="icon">
              <a
                href="https://github.com/ZaynJarvis/NTU-Shuttle-Bus"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github fa-2x" />
              </a>
            </span>
            <p>
              I work with NTU-CITS (center of information and technology center)
              and NTUSU (student union) on a mobile app project for the on-going
              smart campus project initiated by NTU. We are to create a mobile
              app for real time bus location, student feedback collection
              platform, and more.
            </p>
          </div>
          <div className="project project-video">
            <iframe
              title="youtube video"
              src="https://www.youtube.com/embed/cI7A0OxPxVE?rel=0&amp;showinfo=0"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen="true"
            />
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/xsfMCbqQweI"
              frameborder="0"
              allow="autoplay; encrypted-media"
            />
          </div>
          <div className="project project-video">
            <iframe
              title="youtube video"
              src="https://www.youtube.com/embed/gCnwlpC9ty8?rel=0&amp;showinfo=0"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen="true"
            />
          </div>
          <div className="project project-video">
            <iframe
              title="youtube video"
              src="https://www.youtube.com/embed/WHGb2NOMiQ0?rel=0&amp;showinfo=0"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen="true"
            />
          </div>
          <div className="project project-text">
            <h3>Internet &amp; Training</h3>
            <p>
              I bought a domain name, SSL certificate and created my server on
              DigitalOcean, and learned Linux command line, Git, Github, SSH,
              VPN, and became the software trainer of Garage@EEE, Xperience@EEE
              and NTUOSS.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
