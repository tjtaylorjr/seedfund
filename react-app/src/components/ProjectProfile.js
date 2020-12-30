import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';

function ProjectProfile(props) {
  const [project, setProject] = useState({});
  const [canEdit, setCanEdit] = useState(false);
  const [amount, setAmount] = useState('');
  const [pledged, setPledged] = useState(false);
  const history = useHistory();

  const { id } = useParams();

  const userId = props.user.id;

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/projects/${id}`);
      const res = await response.json();
      setProject(res);
      if (project.user_id === props.user.id) {
        setCanEdit(true);
      }
    })();
  }, []);


  if (project.error) {
    return <Redirect exact to='/' />
  }

  const editProject = () => {
    history.push(`/project/${id}/edit`);
  };

  const fund = async () => {
    if (!props.authenticated) {
      history.push('/login');
    }

    const response = await fetch(`/api/projects/${id}/pledges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        projectId: id,
        amount,
      }),
    });
    setPledged(true)
  };

  const deleteProject = async () => {
    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      history.push('/')
    }
  }

  return (
    <div>
      <div>
        <h1>{project.title}</h1>
      </div>
      <div>
        <h1>{project.category}</h1>
      </div>
      <div>
        <img src={project.image} alt="Project Image" />
      </div>
      <div>
        <label>Description</label>
        <p>{project.description}</p>
      </div>
      <div>
        <label>Goal Date</label>
        <h1>{project.date_goal}</h1>
      </div>
      <div>
        <h1>{project.balance}</h1>
        <p>pledge of ${project.funding_goal} goal</p>
      </div>
      {canEdit && (
        <div>
          <button onClick={editProject}>Edit</button>
          <br/>
          <button onClick={deleteProject}>Delete</button>
        </div>
      )}
      <div>
        <input placeholder="Your funding goal "
          type="number"
          min="0.00"
          step="1.00"
          max={project.fundingGoal}
          value={amount}
          onChange={(e) => {setAmount(e.target.value)}}
          />
        <button onClick={fund}>Fund</button>
        {pledged && (
        <div>
          <h1>Thank you for your pledge of ${amount}</h1>
        </div>
        )}
      </div>
    </div>
  );
}

export default ProjectProfile;
