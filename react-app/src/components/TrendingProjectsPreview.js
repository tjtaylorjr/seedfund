import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import default_img620by350 from "../assets/images/default_img620by350.png";
import ProjectProfile from "./ProjectProfile";
import TrendingList from "./TrendingList";

const TrendingProjectsPreview = () => {
  const [trending, setTrending] = useState([])

  useEffect(() => {
    let data;
    (async () => {
      const res = await fetch('/api/projects/trending', {
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await res.json();
      console.log(data)
      if (data) {
        setTrending(data.data)
      }
    })();
  }, []);

  const faketrending = [
    {
      id: 1,
      user_id: 1,
      title: "Example Project 1",
      description: "This is an example project",
      funding_goal: 500000.00,
      balance: 495000.00,
      date_goal: "01/03/2021",
      category: "Other",
    },
    {
      id: 2,
      user_id: 1,
      title: "Example Project 2",
      description: "This is an example project",
      funding_goal: 250000.00,
      balance: 55000.00,
      date_goal: "01/11/2021",
      category: "Music",
    },
    {
      id: 3,
      user_id: 1,
      title: "Example Project 3",
      description: "This is an example project",
      funding_goal: 50000.00,
      balance: 105000.00,
      date_goal: "01/15/2021",
      category: "Arts",
    },
    {
      id: 4,
      user_id: 1,
      title: "Example Project 4",
      description: "This is an example project",
      funding_goal: 1000000.00,
      balance: 733000.00,
      date_goal: "01/24/2021",
      category: "Games",
    }
  ]
  const creator = "Creator Placeholder";
  let project =
    {
      id: "placeholder",
      title: "Project Name Placeholder",
      goal: 1000000,
      balance: 2000000
    };

  const funding = () => {
    const current = (project.balance * 100) / project.goal
    const percentFunded = current + "% funded"
    return percentFunded
  };
  let databaseInfo;

  if(trending) {
    databaseInfo = trending;
  } else {
    databaseInfo = faketrending
  }

  return (
    <>
      <div className="trending-projects">
        <div className="trending-projects__container">
          <div className="trending-projects__wrapper">
            <div className="trending-projects__featured-card">
              <section>
                <h3 className="trending-projects__featured-card-header">FEATURED PROJECT</h3>
                <div className="trending-projects__featured-card-hover-field">
                  <NavLink to="#" className="trending-projects__featured-card-navlink">
                    <div className="trending-projects__featured-card-focusable-link">
                      <img className="trending-projects__featured-card-image" src={default_img620by350} />
                      <div className="trending-projects__featured-card-progress-bar">
                        <div className="trending-projects__featured-card-progression-color"></div>
                      </div>
                    </div>
                    <h3 className="trending-projects__featured-card-project-name">Project Name Placeholder</h3>
                    <p className="trending-projects__featured-card-project-desc">Project Description Placeholder</p>
                    <div className="trending-projects__featured-card-project-creator-container">
                      <div>
                        <span className="trending-projects__featured-card-creator">By {creator}</span>
                      </div>
                    </div>
                  </NavLink>
                </div>
              </section >
            </div>
            <div className="trending-projects__right-panel">
              <h3 className="trending-projects__right-panel-header">TRENDING PROJECTS</h3>
              <div>
                <ul className="trending-projects__right-panel-list">
                  {databaseInfo.map((project, i) => (
                    <TrendingList key={i} data={project} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrendingProjectsPreview;
