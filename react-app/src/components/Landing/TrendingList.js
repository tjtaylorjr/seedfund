import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCreatorName } from "../../services/utils";
import default_img from "../../assets/images/default_img560by315.png";
import LoadingAnimation from "../LoadingAnimation.js";

const TrendingList = (data) => {
  const [project, setProject] = useState({});
  const [creator, setCreator] = useState("");
  const [funding, setFunding] = useState("");

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
      setProject({...projectData});
    }
    return () => mounted = false;
  }, [data.data]);

  useEffect(() => {
    let mounted = true;

    const current = parseInt((project.balance * 100) / project.funding_goal);
    const percentFunded = current + "% funded";
    if(mounted) {
      setFunding(percentFunded);
    }
    return () => mounted = false;
  }, [project.balance, project.funding_goal])

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
  }, [project.user_id]);

  useEffect(() => {
    let mounted = true;

    const hideSpinner = () => spinnerRef.current.classList.add('loadSpinner--hide');

    if (mounted) {
      setTimeout(() => {
        hideSpinner()

      }, 1750)
    }
    return () => mounted = false;
  }, []);

  return (
    <li className="trending-projects__right-panel-list-item">
      <div className="trending-projects__right-panel-list-item-container">
        <div className="trending-projects__right-panel-list-item-navlink-container">
          <NavLink
            to={"/project/" + project.id}
            className="trending-projects__right-panel-list-item-navlink"
            >
            <div ref={spinnerRef} className="loadSpinner">
              <LoadingAnimation size={"SML"} />
            </div>
            <div
              className="trending-projects__right-panel-list-item-navlink-wrapper"
              style={
                project.image
                  ? { backgroundImage: `url(${project.image})` }
                  : { backgroundImage: `url(${default_img})` }
              }
            ></div>
          </NavLink>
        </div>
        <div className="trending-projects__right-panel-list-item-info-container">
          <div>
            <NavLink
              to={"/project/" + project.id}
              className="trending-projects__right-panel-list-item-name"
            >
              {project.title}
            </NavLink>
            <span className="trending-projects__right-panel-list-item-funding">
              {funding}
            </span>
            <div>
              <NavLink
                to={"/project/" + project.id}
                className="trending-projects__right-panel-list-item-creator"
              >
                <span>{"By " + creator}</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TrendingList;
