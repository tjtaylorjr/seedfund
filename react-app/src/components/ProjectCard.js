import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import defaultimg350by200 from "../assets/images/default_img350by200.png";

const ProjectCard = (props) => {
  // const [project, setProject] = useState({});
  const [creator, setCreator] = useState('');
  const [numPledges, setNumPledges] = useState(0);
  const {
    id,
    user_id,
    title,
    description,
    funding_goal,
    balance,
    date_goal,
    category
  } = props.data;
  // const projectData = {
  //   id: id,
  //   user_id: user_id,
  //   title: title,
  //   description: description,
  //   funding_goal: funding_goal,
  //   balance: balance,
  //   date_goal: date_goal,
  //   category: category
  // }

  const percentFunded = parseInt((balance * 100) / funding_goal);
  const progressBarPercent = (Math.min(100, percentFunded) + "%");
  // const currentDate = new Date().toLocaleString();

  useEffect(() => {
    // if (projectData) {
    //   setProject(projectData);
    // }
    (async () => {
      try {
        const res = await fetch(`/users/${user_id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (!res.ok) {
          throw res
        }
        const user = await res.json();
        if (user) {
          const { firstname, lastname } = user;
          setCreator(firstname + ' ' + lastname);
        }

        const pledgeRes = await fetch('/api/projects/<id>/pledges', {
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (!pledgeRes.ok) {
          throw res
        }
        data = await pledgeRes.json();
        setNumPledges(data.length);

      } catch (e) {
        console.error(e);
      }
    })();

  }, []);

  // let progress;
  // const funding = () => {
  //   const current = parseInt((balance * 100) / funding_goal).toString()
  //   progress = current + '%'
  //   const percentFunded = current + "%"
  //   return percentFunded
  // };


  // const percentage = () => {
  //   const current = parseInt((balance * 100) / funding_goal)
  //   // console.log(typeof (current));
  //   // console.log(current)
  //   let progress;
  //   if (current > 100) {
  //     progress = "100%"
  //   } else {
  //     progress = current + "%"
  //   }
  //   const styling = { width: progress }
  //   return styling;
  // }


  // const pledged = async () => {
  //   const res = await fetch('/api/projects/<id>/pledges', {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })

  //   if (!res.ok) {
  //     throw res
  //   }

  //   data = await res.json();
  //   return data;
  // }


  // console.log(currentDate)
  // const timeLeft = "shut up";
  return (
    <div className="projectcard">
      <div>
        <div className="projectcard__wrapper">
          <div className="projectcard__container">
            <div className="projectcard__picturebox">
              <NavLink to={'/project/' + id} className="projectcard__picturebox-navlink">
                <img src={defaultimg350by200} className="projectcard__picture" />
              </NavLink>
            </div>
            <div>
              <div className="projectcard__topdata">
                <div className="projectcard__topdata-text-container">
                  <NavLink to={'/project/' + id} className="projectcard__topdata-name">
                    <h3 className="projectcard__topdata-header">{title}</h3>
                    <p className="projectcard__topdata-desc">{description}</p>
                  </NavLink>
                </div>
              </div>
              <div className="projectcard__topdata-creator">
                <div style={{ display: "inline-block" }}>
                  <NavLink to="#" className="projectcard__topdata-creator-link">
                    <span>{"By " + creator}</span>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="projectcard__bottomdata">
              <div className="projectcard__bottomdata-fillbar">
                <div
                  className="projectcard__bottomdata-fillbar-progress"
                  style={{ width: progressBarPercent }}>
                </div>
              </div>
              <div className="projectcard__bottomdata-campaign">
                <div className="projectcard__bottomdata-pledged">
                  <span>{numPledges + ' pledged'}</span>
                </div>
                <div className="projectcard__bottomdata-percent-funded">
                  <span>{percentFunded + '% funded'}</span>
                </div>
                <div className="projectcard__bottomdata-days">
                  <span className="projectcard__bottomdata-days-text">{date_goal}</span>
                </div>
                <div>
                  <NavLink to={'/search?q=' + category.toLowerCase()} className="projectcard__bottomdata-category">{category}</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard;
