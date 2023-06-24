import React from "react";
import "../css/home.css";
import { Navbar } from "../component/navbar";

export const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="an" align="center">
        <h1>UNLOCK YOUR FULL POTENTIAL</h1>
        <h2> WITH OUR HASHNOTE</h2>
        <hr></hr>
      </div>
      <div className="ani">
        <div className="ani1">
          <h1>To-do list</h1>
          <p>
            A to-do list is a tool that helps organize tasks and activities. It
            allows individuals to prioritize and track their progress. Tasks can
            be categorized, assigned deadlines, or marked with priority levels.
            By using a to-do list, individuals can manage their time
            effectively. It provides a sense of structure and helps increase
            productivity.
          </p>
          <p>
            In summary, a to-do list is a valuable tool for organizing tasks,
            managing time, and maintaining productivity. It helps individuals
            prioritize, track progress, and stay focused on their goals,
            resulting in increased efficiency and reduced stress levels.
          </p>
          <p>
            Avoid the trap of filling your to-do list with an overwhelming
            number of tasks. Instead, focus on important and impactful tasks
            that align with your goals and priorities. This ensures that you are
            working on tasks that truly matter
          </p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/6194/6194029.png"
          alt="error"
          style={{ height: "40%", width: "30%" }}
        />
      </div>
      <div className="ani2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/340/340065.png"
          alt="error"
          style={{ height: "40%", width: "30%" }}
        />
        <div className="ani3">
          <h1>Notes</h1>
          <p>
            Digital notes can take various forms, including text documents,
            spreadsheets, presentations, audio recordings, images, and more. The
            format and structure of digital notes can vary depending on the
            purpose and the software or application used.
          </p>
          <p>
            A flexible all-in-one workspace that combines note-taking, project
            management, and collaboration features. It offers customizable
            templates and databases to organize your information.
          </p>
          <p>
            {" "}
            Digital notes can be accessed and edited from multiple devices,
            including computers, smartphones, and tablets, as long as there is
            an internet connection or synchronization.Digital notes can be
            easily organized into folders, tags, or categories, making it simple
            to find and retrieve specific information when needed.
          </p>
        </div>
      </div>
    </div>
  );
};
