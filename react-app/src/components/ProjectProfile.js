import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';


function ProjectProfile() {
  const [project, setProject] = useState({});

  const history = useHistory()

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return
    }

    (async () => {
        const response = await fetch(`/api/projects/${id}`);
        const project = await response.json();
        setProject(project);
    })();
  }, []);

  if (!project) {
    return null;
  }

  const editProject = () => {
    history.push(`/project/${id}/edit`);
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
      <div>
        <button onClick={editProject}>Edit</button>
      </div>
    </div>
  );
}

export default ProjectProfile;
