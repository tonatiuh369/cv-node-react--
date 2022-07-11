import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
// import MyImage from "./logo.jpg";


function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try{
        const response = await axios.get(
          //`data_resume.json` // <-for local testing (json in public folder)
          "http://localhost:3100/users" // <-backend json data url
        );
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);


  function Profile(props) {
    return <div id="profile">
      <div id="image">
          {/* 👇️ local image */}
          {/* <img id="profile-photo" src={MyImage} alt="Profile-Image" /> */}
          {/* 👇️ external image */}
          <img id="profile-photo" src={props.image_} alt="Profile-Image" />
      </div>
      <p id="name">{props.name_}</p><span id="designation">{props.title_}</span><br /><br />
      <hr width="100%" />
      <div id="social-links"><a href={"tel:" + props.phone_}><i class="fas fa-phone stroke-transparent"></i></a><a href={"mailto:" + props.email_}><i class="fas fa-envelope stroke-transparent"></i></a><a href={"https://www." + props.linkedin_}><i class="fab fa-linkedin-in stroke-transparent"></i></a><a href={"https://www." + props.github_}><i class="fab fa-github stroke-transparent"></i></a></div>
      <p id="telephone">Telephone<br /><strong>{props.phone_}</strong></p>
      <p id="email">Email<br /><strong>{props.email_}</strong></p>
      <p id="location">Location<br /><strong>{props.location_}</strong></p>
      <p id="linkedin">LinkedIn<br /><strong>{props.linkedin_}</strong></p>
      <p id="github">Github<br /><strong>{props.github_}</strong></p>
    </div>
  }

  function Summary(props) {
    return <div id="summary" class="card">     
      <p><i class="fas fa-chevron-right stroke-transparent"></i>&nbsp;&nbsp;&nbsp;Summary</p>
      <p class="description">{props.description}</p>
    </div>  
  }

  function Skills(props) {
    return <div id="skills" class="card">
      <p><i class="fas fa-code stroke-transparent"></i>&nbsp;&nbsp;&nbsp;Skills</p>
      <ul>
          <li><p class="tags">Languages/Technologies: <span class="description"> {props.languages_}</span></p></li>
          <li><p class="tags">DB: <span class="description"> {props.db_}</span></p></li>
          <li><p class="tags">VCS: <span class="description"> {props.vcs_}</span></p></li>
          <li><p class="tags">IDEs: <span class="description"> {props.ides_}</span></p></li>
          <li><p class="tags">CMS: <span class="description"> {props.cms_}</span></p></li>
      </ul>
    </div>
  }

  function Projects(props) {
    return <div id="projects" class="card">
      <p><i class="fas fa-project-diagram stroke-transparent"></i>&nbsp;&nbsp;&nbsp;Projects</p>
      <p class="description">{props.project_}{/* {props.name_ + "(" + props.technologies_ + ")"} */}</p>
    </div>
  }
  
  function Experience(props) {
    return <div id="experience" class="card">
      <p><i class="fas fa-laptop-code stroke-transparent"></i>&nbsp;&nbsp;&nbsp;Experience</p>
      <ul>
          <li>{props.job_}</li>
      </ul>
    </div>
  }

  function Education(props) {
    return <div id="education" class="card">
      <p><i class="fas fa-graduation-cap stroke-transparent"></i>&nbsp;&nbsp;&nbsp;Education</p>
      <ul>
          <li><p class="tags">{props.degree_}<br /><span>{props.institute_}</span></p>
              <a class="edit" href="#"><i class="fas fa-pen stroke-transparent-blue"></i></a></li>
      </ul>
    </div>
  }

  function Languages(props) {
    return <div id="languages" class="card">
      <p><i class="fas fa-globe stroke-transparent"></i>&nbsp;&nbsp;&nbsp;Languages</p>
      <ul>
          <li><p class="tags">English: <span class="description"> Intermediate-Advanced</span></p></li>
          <li><p class="tags">Spanish: <span class="description"> Native</span></p></li>
      </ul>
    </div>
  }

  return (
    <div className="App">
      {loading && <div className="loading">A moment please...</div>}
      {error && (
        <div className="loading">{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <div id="container">
        <Profile 
          image_={data && data.personalData.image}
          name_={data && data.personalData.name}
          title_={data && data.personalData.title}
          phone_={data && data.personalData.contacts[0].value}
          email_={data && data.personalData.contacts[1].value}
          location_={data && data.personalData.contacts[2].value}
          linkedin_={data && data.personalData.contacts[3].value}
          github_={data && data.personalData.contacts[4].value}
        />
        <div id="info-cards">
        <Summary 
/*             description={data && data.summary[0].paragraph} */
          description={ data && data.summary.map( ({ paragraph })  => ( 
            <p>{paragraph}</p>
          ))}
        />.
        <Skills 
          languages_={data && data.skills.languages}
          db_={data && data.skills.db}
          vcs_={data && data.skills.vcs}
          ides_={data && data.skills.ides}
          cms_={data && data.skills.cms}
        />
        <Projects
          project_={ data && data.projects.map( ({ name, technologies })  => ( 
            <span>{name + " (" + technologies + ") | "}</span>
          ))}
        />
        <Experience
          job_={ data && data.experience.map( ({ end, start, position, company })  => ( 
            <p class="tags">{position}<br /><span>{company} | <span>{start + " - " + end}</span></span></p>
              
          ))}
        />
        <Education
            institute_={data && data.education_[0].school}
            degree_={data && data.education_[0].degree}
        />
        <Languages />

        </div>

      </div>

    </div>
  );
}

export default App