import React, { useEffect, useState } from "react";

const UserProfile = (props) => {
  const user = props.user;
  const userName = `${user.firstname} ${user.lastname}`;
  const [pledgeMatch, setPledgeMatch] = useState(false);
  const [projectMatch, setProjectMatch] = useState(false);
  const [pledges, setPledges] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      const pledgeRes = await fetch(`/api/users/${user.id}/pledges`);
      const projectRes = await fetch(`/api/projects/user/${user.id}`);
      const pledgeJSON = await pledgeRes.json();
      const projectJSON = await projectRes.json();

      // let match = pledgeJSON.pledges.filter(
      //   (pledge) => pledge.user_id === user.id
      // );
      if (pledgeJSON.pledges.length && projectJSON.projects.length) {
        if (!pledgeMatch && !projectMatch) {
          setPledgeMatch(true);
          setProjectMatch(true);
          setPledges(pledgeJSON.pledges);
          setProjects(projectJSON.projects);
          return;
        }
        return;
      } else if (projectJSON.projects.length) {
        setProjectMatch(true);
        setProjects(projectJSON.projects);
      } else if (pledgeJSON.pledges.length) {
        setPledgeMatch(true);
        setPledges(pledgeJSON.pledges);
        return;
      }
    })();
  }, [user.id]);
  console.log(pledges);
  console.log(projects);

  return (
    <div className="user-profile__main-container">
      <div className="user-username">{userName}</div>
      <div className="my-projects__main-container">
        <h1 className="my-projects-header">My Projects</h1>
        {projectMatch &&
          projects.map((project) => {
            return (
              <div key={project.id} className="my-project__project-container">
                <div className="project-title">{project.title}</div>
              </div>
            );
          })}
      </div>
      <div className="my-pledges__main-container">
        <h1 className="my-pledges-header">Projects Backed</h1>
        {pledgeMatch &&
          pledges.map((pledge) => {
            return (
              <div key={pledge.id} className="my-pledge__pledge-container">
                <div className="pledge-project-title">
                  {pledge.project.title}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UserProfile;
