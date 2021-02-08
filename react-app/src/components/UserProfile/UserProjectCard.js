import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  getPledgeCount,
  getCreatorName,
  dateDiffInDays,
  fillBar,
} from "../../services/utils";
import default_img from "../../assets/images/default_img350by200.png";
import LoadingAnimation from "../LoadingAnimation.js";

const UserProjectCard = (data) => {
  const [project, setProject] = useState({});
  const [pledgeCount, setPledgeCount] = useState(0);
  const [creator, setCreator] = useState("");

  const spinnerRef = useRef();

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
      setProject({...projectData });
    }

    return () => mounted = false;
  },[data.data])

  useEffect(() => {
    (async () => {
      if (project.user_id) {
        try {
          const ownerName = await getCreatorName(project.user_id);
          setCreator(ownerName);
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, [project]);

  const funding = () => {
    const current = parseInt((project.balance * 100) / project.funding_goal).toString();
    const percentFunded = current + "%";
    return percentFunded;
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (mounted && project.id) {
          const pledgeNum = await getPledgeCount(project.id);
          setPledgeCount(pledgeNum);
        }
      } catch (e) {
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
        <div className="userprojectcard__bottomdata-days">
          <span>{days + " days to go"}</span>
        </div>
      );
    } else if (days === -1) {
      return (
        <div className="userprojectcard__bottomdata-days">
          <span>{`Ended ${Math.abs(days)} day ago`}</span>
        </div>
      );
    }

    return (
      <div className="userprojectcard__bottomdata-days">
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

      }, 2000)
    }
    return () => mounted = false;
  }, [project.image]);

  return (
    <>
      <div className="userprojectcard">
        <div>
          <div className="userprojectcard__wrapper">
            <div className="userprojectcard__container">
              <div className="userprojectcard__picturebox">
                <NavLink
                  to={"/project/" + project.Mathid}
                  className="userprojectcard__picturebox-navlink"
                >
                  <div ref={spinnerRef} className="loadSpinner">
                    <LoadingAnimation size={"MED-SML"} />
                  </div>
                  <div
                    style={
                      project.image
                        ? { backgroundImage: `url(${project.image})` }
                        : { backgroundImage: `url(${default_img})` }
                    }
                    className="userprojectcard__picture"
                  ></div>
                </NavLink>
              </div>
              <div>
                <div className="userprojectcard__topdata">
                  <div className="userprojectcard__topdata-text-container">
                    <NavLink
                      to={"/project/" + project.id}
                      className="userprojectcard__topdata-name"
                    >
                      <h3 className="userprojectcard__topdata-header">
                        {project.title}
                      </h3>
                    </NavLink>
                  </div>
                </div>
                <div className="userprojectcard__topdata-creator">
                  <div style={{ display: "inline-block" }}>
                    <NavLink
                      to={{
                        pathname: "/discover/users/" + creator,
                        state: { creator_id: project.user_id },
                      }}
                      className="userprojectcard__topdata-creator-link"
                    >
                      <span>{"By " + creator}</span>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="userprojectcard__bottomdata">
                <div className="userprojectcard__bottomdata-fillbar">
                  <div
                    className="userprojectcard__bottomdata-fillbar-progress"
                    style={fillBar(project.balance, project.funding_goal)}
                  ></div>
                </div>
                <div className="userprojectcard__bottomdata-campaign">
                  <div className="userprojectcard__bottomdata-pledged">
                    <span>{pledgeCount + " pledged"}</span>
                  </div>
                  <div className="userprojectcard__bottomdata-percent-funded">
                    <span>{funding() + " funded"}</span>
                  </div>
                  {remainingDays()}
                  <div>
                    {project.category ? (
                      <NavLink
                        to={"/discover/" + project.category.toLowerCase()}
                        className="userprojectcard__bottomdata-category"
                      >
                        {project.category}
                      </NavLink>
                    ) : (
                      <NavLink
                        to={"#"}
                        className="userprojectcard__bottomdata-category"
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

export default UserProjectCard;
