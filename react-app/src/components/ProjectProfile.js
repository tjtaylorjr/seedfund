import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function ProjectProfile(props) {
  const [project, setProject] = useState({});
  const [canEdit, setCanEdit] = useState(false);
  const [amount, setAmount] = useState('')
  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/projects/${id}`);
      const project = await response.json();
      setProject(project);
      if (project.userId === props.user.id) {
        setCanEdit(true);
      }
    })();
  }, []);

  if (!project) {
    return null;
  }

  const editProject = () => {
    history.push(`/project/${id}/edit`);
  };

  const fund = () => {
    if (!props.authenticated) {
      history.push('/login');
    }
    const userId = props.user.id
    const projectId = project.id
    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        projectId,
        amount,
      }),
    });
  };

  const deleteProject = () => {
    const response = await fetch("",{

    })
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
        <h1>{project.goalDate}</h1>
      </div>
      <div>
        <h1>{project.balance}</h1>
        <p>`pledge of $ ${project.fundingGoal} goal`</p>
      </div>
      {canEdit && (
        <div>
          <button onClick={editProject}>Edit</button>
        </div>
      )}
        <div>
          <button onClick={deleteProject}>Delete</button>
        </div>
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
      </div>
    </div>
  );
}

export default ProjectProfile;
