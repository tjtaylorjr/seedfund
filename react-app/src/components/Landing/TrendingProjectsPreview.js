import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fillBar, getCreatorName } from "../../services/utils";
// import default_img620by350 from "../assets/images/default_img620by350.png";
// import ProjectProfile from "./Project/ProjectProfile";
import TrendingList from "./TrendingList";

const TrendingProjectsPreview = () => {
  const [trending, setTrending] = useState([]);
  const [featured, setFeatured] = useState({});
  const [creator, setCreator] = useState("Fake User");

  useEffect(() => {
    let data = null;
    (async () => {
      const res = await fetch("/api/projects/trending", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      data = await res.json();
      if (data) {
        setTrending(data.trending_projects);
      }
    })();
  }, []);

  useEffect(() => {
    let random;
    (async () => {
      const res = await fetch("/api/projects/random", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      random = await res.json();

      if (random) {
        setFeatured(random.random_project[0]);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (featured.user_id) {
        try {
          const ownerName = await getCreatorName(featured.user_id);
          setCreator(ownerName);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [featured]);

  // const funding = () => {
  //   const current = (project.balance * 100) / project.goal
  //   const percentFunded = current + "% funded"
  //   return percentFunded
  // };
  let databaseInfo;

  if (trending) {
    databaseInfo = trending;
  } else {
    databaseInfo = null;
  }

  return (
    <>
      <div className="trending-projects">
        <div className="trending-projects__container">
          <div className="trending-projects__wrapper">
            <div className="trending-projects__featured-card">
              <section>
                <h3 className="trending-projects__featured-card-header">
                  FEATURED PROJECT
                </h3>
                <div className="trending-projects__featured-card-hover-field">
                  <div
                    // to="#" react does not allow nested links (i.e. <a> within an <a>)
                    className="trending-projects__featured-card-navlink"
                  >
                    <div className="trending-projects__featured-card-focusable-link">
                      <NavLink to={"/project/" + featured.id}>
                        <div
                          className="trending-projects__featured-card-image"
                          style={
                            featured.image
                              ? { backgroundImage: `url(${featured.image})` }
                              : null
                          }
                        ></div>
                        <div className="trending-projects__featured-card-progress-bar">
                          <div
                            className="trending-projects__featured-card-progression-color"
                            style={fillBar(
                              featured.balance,
                              featured.funding_goal
                            )}
                          ></div>
                        </div>
                      </NavLink>
                    </div>
                    <h3 className="trending-projects__featured-card-project-name">
                      {featured.title}
                    </h3>
                    <p className="trending-projects__featured-card-project-desc">
                      {featured.description}
                    </p>
                    <div className="trending-projects__featured-card-project-creator-container">
                      <div>
                        <span className="trending-projects__featured-card-creator">
                          By {creator}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="trending-projects__right-panel">
              <h3 className="trending-projects__right-panel-header">
                TRENDING PROJECTS
              </h3>
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
  );
};

export default TrendingProjectsPreview;
