import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";

function ProjectProfile(props) {
  const [project, setProject] = useState({});
  const [canEdit, setCanEdit] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [pledged, setPledged] = useState(false);
  const history = useHistory();

  const { id } = useParams();
  const userId = props.user.id;

  //check if project belongs to user
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/projects/${id}`);
      const res = await response.json();
      setProject(res);
      if (project.user_id === props.user.id) {
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
      if (match.length) setPledged(true);
    })();
  }, [id, userId]);

  if (project.error) {
    return <Redirect exact to="/" />;
  }
  const editProject = () => {
    history.push(`/project/${id}/edit`);
  };

  //handle pledge submission
  const handlePledge = async (e) => {
    e.preventDefault();
    if (!props.authenticated) {
      history.push("/login");
    }
    //error handling for user's pledge amount
    if (amount < 0) {
      return setAmountError("Pledge amount must be at least $1.00");
    } else if (amount > project.funding_goal - amount) {
      return setAmountError("Pledge cannot exceed funding goal");
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
    setProject(res.project);
    setAmount("");
    setAmountError("");
    if (method === "POST") setPledged(true);
  };

  const deleteProject = async () => {
    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      history.push("/");
    }
  };

  return (
    <div className="project-profile__main-container">
      <div className="project-profile-page__main-container">
        <div className="project-profile-page__header">
          <div className="project-profile-page__header-title">
            <h1>{project.title}</h1>
          </div>
          <div className="project-profile-page__header-category">
            <h1>{project.category}</h1>
          </div>
        </div>
        <div className="project-profile-page__info">
          <div className="project-profile-page__image-container">
            <img src={project.image} alt={`${project.title}`} />
          </div>
          <div className="project-profile-page__info-container">
            <div className="project-profile-page__description">
              <label>Description</label>
              <p>{project.description}</p>
            </div>
            <div className="project-profile-page__goal-date">
              <label>Goal Date</label>
              <h1>{project.date_goal}</h1>
            </div>
            <div className="project-profile-page__balance">
              <h1>{project.balance}</h1>
              <p>pledge of ${project.funding_goal} goal</p>
            </div>
            {canEdit && (
              <div>
                <button onClick={editProject}>Edit</button>
                <br />
                <button onClick={deleteProject}>Delete</button>
              </div>
            )}
          </div>
        </div>
        <div>
          <form>
            {amountError ? <span>{amountError}</span> : <></>}
            <input
              placeholder="Your funding goal "
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
              <button onClick={handlePledge}>Update Pledge</button>
            ) : (
              <button onClick={handlePledge}>Pledge</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectProfile;
