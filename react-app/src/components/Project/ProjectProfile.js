import React, { useEffect, useRef, useState } from "react";
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import LoadingAnimation from "../LoadingAnimation.js";
import { dateDiffInDays, getPledgeCount, fillBar } from "../../services/utils";
import default_img from '../../assets/images/default_img620by350.png';

const ProjectProfile = (props) => {
  const [project, setProject] = useState({});
  const [creator, setCreator] = useState({});
  const [canEdit, setCanEdit] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [pledged, setPledged] = useState(false);
  const [userPledgeAmount, setUserPledgeAmount] = useState(0);
  const [pledgeCount, setPledgeCount] = useState(null);

  const history = useHistory();
  const spinnerRef = useRef();
  const { id } = useParams();
  const userId = props.user.id;
  const creatorName = creator.firstname + " " + creator.lastname;

  //check if project belongs to user
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/projects/${id}`);
      const res = await response.json();
      if (res.error) {
        return <Redirect exact to="/" />;
      }
      setProject(res);
      if (props.user.id !== undefined && project.user_id === props.user.id) {
        setCanEdit(true);
      }
    })();
  }, [id, project.user_id, props.user.id]);

  //check if user has pledged to this project before
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/projects/${id}/pledges`);
      const res = await response.json();
      let match = res.pledges.filter((pledge) => pledge.user_id === userId);
      if (match.length) {
        setUserPledgeAmount(match[0].amount);
        setPledged(true);
      }
    })();
  }, [id, userId]);

  useEffect(() => {
    (async () => {
      try {
        if (!project.user_id) return;
        const res = await fetch(`/users/${project.user_id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw res;
        }

        const data = await res.json();
        if (data) {
          setCreator(data);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [project]);

  const editProject = () => {
    history.push(`/project/${id}/edit`);
  };

  //get total pledges
  useEffect(() => {
    (async () => {
      const pledgeNum = await getPledgeCount(id);
      setPledgeCount(pledgeNum);
    })();
  }, [id, pledged]);

  //handle pledge submission
  const handlePledge = async (e) => {
    e.preventDefault();
    if (!props.authenticated) {
      history.push("/login");
    }
    //error handling for user's pledge amount
    if (amount <= 0) {
      return setAmountError("Pledge amount must be at least $1.00");
    } else if (!Number(amount)) {
      return setAmountError("Pledge amount must be numerical");
    }

    let method = pledged ? "PUT" : "POST";

    const response = await fetch(`/api/projects/${id}/pledges`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        projectId: id,
        amount,
      }),
    });
    const res = await response.json();
    if (res.error) {
      return setAmountError(res.error);
    }
    if (method === "PUT") setUserPledgeAmount(res.pledge.amount);
    if (method === "POST") {
      setPledged(true);
      setUserPledgeAmount(res.pledge.amount);
    }
    setProject(res.project);
    setAmount("");
    setAmountError("");
  };

  const remainingDays = () => {
    const days = dateDiffInDays(project.date_goal);
    const fundingResult = project.balance >= project.funding_goal;
    if (days > 0) {
      return (
        <div className="project-profile-page__goal-date">
          <h1>{dateDiffInDays(project.date_goal)}</h1>
          <p>days to go</p>
        </div>
      );
    } else if (days === -1) {
      return (
        <div className="project-profile-page__goal-date">
          <h1>{fundingResult ? "Funded" : "Did not reach goal"}</h1>
          <p>{`Ended ${Math.abs(days)} day ago`}</p>
        </div>
      );
    }

    return (
      <div className="project-profile-page__goal-date">
        <h1>{fundingResult ? "Funded" : "Did not reach goal"}</h1>
        <p>{`Ended ${Math.abs(days)} days ago`}</p>
      </div>
    );
  };

  const deleteProject = async () => {
    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      history.push("/");
    }
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
  }, []);

  return (
    <div className="project-profile-page__container">
        <main className="project-profile-page__main">
          <div className="project-profile-page__main-container">
            {/* header section */}
            <div className="project-profile-page__header">
              <div className="project-profile-page__header-title">
                <h1>{project.title}</h1>
              </div>
              <div className="project-profile-page__header-description">
                <p>{project.description}</p>
              </div>
            </div>
            {/* body for picture and informational box */}
            <div className="project-profile-page__image-container">
              <div className="project-profile-page__image-wrapper">
                {/* <img
                  className="project-profile-page__image"
                  src={project.image || default_img}
                  alt={project.title}
                /> */}
                <div ref={spinnerRef} className="loadSpinner">
                  <LoadingAnimation size={"LRG"} />
                </div>
                <div
                  className="project-profile-page__image"
                  style={
                    project.image
                      ? { backgroundImage: `url(${project.image})` }
                      : { backgroundImage: `url(${default_img})` }
                  }
                ></div>
              </div>
              <NavLink
                to={("/discover/" + project.category).toLowerCase()}
                className="project-profile-page__category"
              >
                <h1>{"Category: " + project.category}</h1>
              </NavLink>
              <NavLink
                to={{
                  pathname: "/discover/users/" + creator,
                  state: { creator_id: project.user_id },
                }}
                className="project-profile-page__creator"
              >
                <h1>{"By " + creatorName}</h1>
              </NavLink>
            </div>
            <div className="project-profile-page__info-container">
              <div className="project-profile-page__progress-bar">
                <div
                  className="project-profile-page__progress-color"
                  style={fillBar(project.balance, project.funding_goal)}
                ></div>
              </div>
              <div className="project-profile-page__info-container-stats">
                <div className="project-profile-page__balance">
                  <h1>
                    $
                    {project.balance
                      ? project.balance.toLocaleString("en-US")
                      : project.balance}
                  </h1>
                  <p>
                    {`pledged of $${
                      project.funding_goal
                        ? project.funding_goal.toLocaleString("en-US")
                        : project.funding_goal
                    }
                    goal`}
                  </p>
                </div>
                <div className="project-profile-page__backer-total">
                  <h1>{pledgeCount}</h1>
                  <p>backers</p>
                </div>
                {remainingDays()}
              </div>
              <form className="project-profile-page__form">
                {amountError ? <span>{amountError}</span> : <></>}
                <input
                  placeholder={
                    pledged
                      ? `Current Pledge Amount $${userPledgeAmount.toLocaleString(
                          "en-US"
                        )}`
                      : "Enter Pledge Amount"
                  }
                  type="number"
                  min="0.00"
                  step="1.00"
                  value={amount}
                  className="project-profile-page__input-field"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
                {pledged ? (
                  <button
                    className="project-profile-page__button"
                    onClick={handlePledge}
                  >
                    Update Pledge
                  </button>
                ) : (
                  <button
                    className="project-profile-page__button"
                    onClick={handlePledge}
                  >
                    Pledge
                  </button>
                )}
              </form>
              {canEdit && (
                <div className="project-profile-page__project-management">
                  <button
                    onClick={editProject}
                    className="project-profile-page__edit-button"
                  >
                    Edit Project
                  </button>
                  <button
                    onClick={deleteProject}
                    className="project-profile-page__delete-button"
                  >
                    Delete Project
                  </button>
                </div>
              )}
            </div>
            {/* </div> */}
          </div>
        </main>
    </div>
  );
};

export default ProjectProfile;
