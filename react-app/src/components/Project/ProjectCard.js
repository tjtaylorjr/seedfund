import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  getPledgeCount,
  getCreatorName,
  dateDiffInDays,
  fillBar,
} from "../../services/utils";
import default_img from '../../assets/images/default_img350by200.png';
import LoadingAnimation from "../LoadingAnimation.js";

const ProjectCard = (data) => {
  const [project, setProject] = useState({});
  const [pledgeCount, setPledgeCount] = useState(0);
  const [creator, setCreator] = useState("");
  const [funding, setFunding] = useState("");

  const spinnerRef = useRef();

  useEffect(() => {
    let mounted = true;

    const showSpinner = () => spinnerRef.current.classList.remove('loadSpinner--hide');

    if (mounted) {
      showSpinner()
    }
    return () => mounted = false;
  }, [data.data.image]);

  useEffect(() => {
    let mounted = true;

    const {
      id,
      user_id,
      title,
      description,
      funding_goal,
      balance,
      image,
      date_goal,
      category,
    } = data.data;

    const projectData = {
      id: id,
      user_id: user_id,
      title: title,
      description: description,
      funding_goal: funding_goal,
      balance: balance,
      image: image,
      date_goal: date_goal,
      category: category,
    };

    if (mounted) {
      setProject({ ...projectData });
    }
    return () => mounted = false;
  }, [data.data]);



  useEffect(() => {
    let mounted = true;
    (async () => {
      if (project.user_id) {
        try {
          const ownerName = await getCreatorName(project.user_id);
          if(mounted) {
            setCreator(ownerName);
          }
        } catch (err) {
          console.error(err);
        }
      }
    })();
    return () => mounted = false;
  }, [project]);

  useEffect(() => {
    let mounted = true;

    const current = parseInt((project.balance * 100) / project.funding_goal);
    const percentFunded = current + "% funded";
    if (mounted) {
      setFunding(percentFunded);
    }
    return () => mounted = false;
  }, [project.balance, project.funding_goal])

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if(mounted && project.id) {
        const pledgeNum = await getPledgeCount(project.id);
          setPledgeCount(pledgeNum);
        }
      } catch(e) {
        console.error(e);
      }
    })();
    return () => mounted = false;
  }, [project.id]);

  const remainingDays = () => {
    const days = dateDiffInDays(project.date_goal);
    const fundingResult = project.balance >= project.funding_goal;
    if (days > 0) {
      return (
        <div className="projectcard__bottomdata-days">
          <span>{days + " days to go"}</span>
        </div>
      );
    } else if (days === -1) {
      return (
        <div className="projectcard__bottomdata-days">
          <span>{`Ended ${Math.abs(days)} day ago`}</span>
        </div>
      );
    }

    return (
      <div className="projectcard__bottomdata-days">
        <span>{`Ended ${Math.abs(days)} days ago`}</span>
      </div>
    );
  };

  useEffect(() => {
    let mounted = true;

    const hideSpinner = () => spinnerRef.current.classList.add('loadSpinner--hide');

    if (mounted) {
      setTimeout(() => {
        hideSpinner()

      }, 2500)
    }
    return () => mounted = false;
  }, [project.image]);

  return (
    <>
      <div className="projectcard">
        <div>
          <div className="projectcard__wrapper">
            <div className="projectcard__container">
              <div className="projectcard__picturebox">
                <NavLink
                  to={"/project/" + project.id}
                  className="projectcard__picturebox-navlink"
                >
                  <div ref={spinnerRef} className="loadSpinner">
                    <LoadingAnimation size={"MED"} />
                  </div>
                  <div
                    style={
                      project.image
                        ? { backgroundImage: `url(${project.image})` }
                        : { backgroundImage: `url(${default_img})`}
                    }
                    className="projectcard__picture"
                  ></div>
                </NavLink>
              </div>
              <div>
                <div className="projectcard__topdata">
                  <div className="projectcard__topdata-text-container">
                    <NavLink
                      to={"/project/" + project.id}
                      className="projectcard__topdata-name"
                    >
                      <h3 className="projectcard__topdata-header">{project.title}</h3>
                      <p className="projectcard__topdata-desc">{project.description}</p>
                    </NavLink>
                  </div>
                </div>
                <div className="projectcard__topdata-creator">
                  <div style={{ display: "inline-block" }}>
                    <NavLink
                      to={{
                        pathname: "/discover/users/" + creator,
                        state: { creator_id: project.user_id },
                      }}
                      className="projectcard__topdata-creator-link"
                    >
                      <span>{"By " + creator}</span>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="projectcard__bottomdata">
                <div className="projectcard__bottomdata-fillbar">
                  <div
                    className="projectcard__bottomdata-fillbar-progress"
                    style={fillBar(project.balance, project.funding_goal)}
                  ></div>
                </div>
                <div className="projectcard__bottomdata-campaign">
                  <div className="projectcard__bottomdata-pledged">
                    <span>{pledgeCount + " pledged"}</span>
                  </div>
                  <div className="projectcard__bottomdata-percent-funded">
                    <span>{funding}</span>
                  </div>
                  {remainingDays()}
                  <div className="projectcard__bottomdata-days">
                    <span className="projectcard__bottomdata-days-text">
                      {"End date: " + project.date_goal}
                    </span>
                  </div>
                  <div>
                    {project.category ? (
                      <NavLink
                        to={"/discover/" + project.category.toLowerCase()}
                        className="projectcard__bottomdata-category"
                      >
                        {project.category}
                      </NavLink>
                    ) : (
                        <NavLink
                          to={"#"}
                          className="projectcard__bottomdata-category"
                        >
                          Category
                        </NavLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
