import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// import defaultimg350by200 from "../assets/images/default_img350by200.png";
import {
  getPledgeCount,
  getCreatorName,
  dateDiffInDays,
  fillBar,
} from "../../services/utils";

const UserProjectCard = (data) => {
  const [project, setProject] = useState({});
  const [pledgeCount, setPledgeCount] = useState(0);
  const [creator, setCreator] = useState("");
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

  useEffect(() => {
    if (projectData) {
      setProject(projectData);
    }
  }, [data]);

  useEffect(() => {
    (async () => {
      if (project.user_id) {
        try {
          const ownerName = await getCreatorName(project.user_id);
          setCreator(ownerName);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [project]);

  const funding = () => {
    const current = parseInt((balance * 100) / funding_goal).toString();
    const percentFunded = current + "%";
    return percentFunded;
  };

  useEffect(() => {
    (async () => {
      const pledgeNum = await getPledgeCount(id);
      setPledgeCount(pledgeNum);
    })();
  }, []);

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

  return (
    <>
      <div className="userprojectcard">
        <div>
          <div className="userprojectcard__wrapper">
            <div className="userprojectcard__container">
              <div className="userprojectcard__picturebox">
                <NavLink
                  to={"/project/" + id}
                  className="userprojectcard__picturebox-navlink"
                >
                  <div
                    style={
                      project.image
                        ? { backgroundImage: `url(${project.image})` }
                        : null
                    }
                    className="userprojectcard__picture"
                  ></div>
                </NavLink>
              </div>
              <div>
                <div className="userprojectcard__topdata">
                  <div className="userprojectcard__topdata-text-container">
                    <NavLink
                      to={"/project/" + id}
                      className="userprojectcard__topdata-name"
                    >
                      <h3 className="userprojectcard__topdata-header">
                        {title}
                      </h3>
                    </NavLink>
                  </div>
                </div>
                <div className="userprojectcard__topdata-creator">
                  <div style={{ display: "inline-block" }}>
                    <NavLink
                      to="#"
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
                    style={fillBar(balance, funding_goal)}
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
                    <NavLink
                      to={"/discover/" + category.toLowerCase()}
                      className="userprojectcard__bottomdata-category"
                    >
                      {category}
                    </NavLink>
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
