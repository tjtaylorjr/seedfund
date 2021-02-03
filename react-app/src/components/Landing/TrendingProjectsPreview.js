import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { fillBar, getCreatorName } from "../../services/utils";
import TrendingList from "./TrendingList";
import default_img_large from "../../assets/images/default_img620by350.png"
import LoadingAnimation from "../LoadingAnimation.js";

const TrendingProjectsPreview = () => {
  const [trending, setTrending] = useState([]);
  const [featured, setFeatured] = useState({});
  const [creator, setCreator] = useState("Fake User");

  const spinnerRef = useRef();

  // preserve code for use in changing content

  // useEffect(() => {
  //   let mounted = true;

  //   const showSpinner = () => spinnerRef.current.classList.remove('hide');

  //   if (mounted) {
  //     showSpinner()
  //   }
  //   return () => mounted = false;
  // }, []);

  useEffect(() => {
    let mounted = true;
    let data = null;
    (async () => {
      const res = await fetch("/api/projects/trending", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(mounted) {
        data = await res.json();
        if (data) {
          setTrending(data.trending_projects);
        }
      }
    })();
    return () => mounted = false;
  }, []);

  useEffect(() => {
    let mounted = true;
    let random;
    (async () => {
      const res = await fetch("/api/projects/random", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(mounted) {
        random = await res.json();

        if (random) {
          setFeatured(random.random_project[0]);
        }
      }
    })();
    return () => mounted = false;
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (featured.user_id) {
        try {
          const ownerName = await getCreatorName(featured.user_id);
          if(mounted) {
            setCreator(ownerName);
          }
        } catch (err) {
          console.error(err);
        }
      }
    })();
    return () => mounted = false;
  }, [featured]);

  let databaseInfo;

  if (trending) {
    databaseInfo = trending;
  } else {
    databaseInfo = null;
  }

  useEffect(() => {
    let mounted = true;

    const hideSpinner = () => spinnerRef.current.classList.add('loadSpinner--hide');

    if(mounted) {
      setTimeout(() => {
        hideSpinner()
      }, 2500)
    }
    return () => mounted = false;
  }, []);

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
                  <div className="trending-projects__featured-card-navlink">
                    <div className="trending-projects__featured-card-focusable-link">
                      <NavLink to={"/project/" + featured.id}>
                        <div ref={spinnerRef} className="loadSpinner">
                          <LoadingAnimation size={"LRG"} />
                        </div>
                        <div
                          className="trending-projects__featured-card-image"
                          style={
                            featured.image
                              ? { backgroundImage: `url(${featured.image})` }
                              : { backgroundImage: `url(${default_img_large})` }
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
                      <NavLink
                        to={{
                          pathname: "/discover/users/" + creator,
                          state: { creator_id: featured.user_id },
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        <span className="trending-projects__featured-card-creator">
                          By {creator}
                        </span>
                      </NavLink>
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
