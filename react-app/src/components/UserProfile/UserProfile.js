import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserProjectCard from "./UserProjectCard";

const UserProfile = (props) => {
  const user = props.user;
  const userName = `${user.firstname} ${user.lastname}`;
  const [pledgeMatch, setPledgeMatch] = useState(false);
  const [projectMatch, setProjectMatch] = useState(false);
  const [pledges, setPledges] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      const projectRes = await fetch(`/api/projects/users/${user.id}`);
      const projectJSON = await projectRes.json();
      if (projectRes.ok && projectJSON.projects) {
        if (!projectMatch && projectJSON.projects.length) {
          setProjectMatch(true);
          setProjects(projectJSON.projects);
          return;
        }
        return;
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      const pledgeRes = await fetch(`/api/users/${user.id}/pledges`);
      const pledgeJSON = await pledgeRes.json();

      if (pledgeRes.ok && pledgeJSON.pledges) {
        if (!pledgeMatch && pledgeJSON.pledges.length) {
          setPledgeMatch(true);
          setPledges(pledgeJSON.pledges);
          return;
        }
        return;
      }
    })();
  }, [user]);

  return (
    <div className="user-profile__main-container">
      <div className="user-username">{userName}</div>
      <div className="user-project-summary">
        <div className="user-project-summary__num-projects">
          {`${projectMatch ? projects.length : "0"} projects started`}
        </div>
        <div className="user-project-summary__num-pledges">
          {`${pledgeMatch ? pledges.length : "0"} projects backed`}
        </div>
      </div>
      <div className="my-projects__main-container">
        <h1 className="my-projects-header">My Projects</h1>
        <div className="my-project__project-container">
          {projectMatch ? (
            projects.map((project) => {
              return <UserProjectCard key={project.id} data={project} />;
            })
          ) : (
            <div className="empty-message">
              You currently don't own any projects.
              <NavLink className="start-project-link" to="/start">
                Start one today!
              </NavLink>
            </div>
          )}
        </div>
      </div>
      <div className="my-pledges__main-container">
        <h1 className="my-pledges-header">Projects Backed</h1>
        <div className="my-pledge__pledge-container">
          {pledgeMatch ? (
            pledges.map((pledge) => {
              return (
                <div key={pledge.id} className="my-pledge__pledge-container">
                  <UserProjectCard data={pledge.project} />
                </div>
              );
            })
          ) : (
            <div className="empty-message">
              You have not backed any projects.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
