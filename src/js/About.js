import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div id="about" className="content">
        <h1 className="lg-heading">
          About&nbsp;
          <span className="text-highlight">Me</span>
        </h1>
        <div className="about-info">
          <div className="intro">
            <div className="portrait" />
            <div className="bio">
              <h3 className="selected">BIO</h3>
              <p>
                I started my undergraduate at Nanyang Technological University
                of Singapore in 2016 as an SM2 scholar. After working on a
                chatbot project, I found my great interest in using the program
                for automation and design. With my passion and my knowledge, I
                believe I will be able to devote and contribute to any projects.
              </p>
            </div>
          </div>
          <div className="projects">
            <div className="project project-text">
              <h3>Trainer</h3>
              <p>
                I am a trainer of Garage@EEE. My specialty is in software
                development and computer science training. One of my projects is
                about game programming in Python, using Pygame framework to
                explain how flappy bird works.
              </p>
            </div>

            <div className="project project-text">
              <h3>Software Engineer</h3>
              <p>
                I am a Software Engineer for a start-up company, SDI Academy. My
                focus is mobile APP development. I use Flutter framework to
                create a cross-platform mobile APP, Dr. English. Our team has
                won the "Singtel Future Maker" competition, and have a
                prospective future.
              </p>
            </div>

            <div className="project project-text">
              <h3>Tech Director</h3>
              <p>
                I am a Tech Director of NTUOSS (NTU Open Source Society). My
                specialty is in teaching mobile APP and web programming. I enjoy
                teaching while learning.
              </p>
            </div>

            <div className="project project-text">
              <h3>MUNer</h3>
              <p>
                I was an active participant in Model United Nation Society when
                I was in high school, with two Outstanding Delegate awards. I
                would love to meet different people with diversity and
                communicate with illuminating ideas.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
