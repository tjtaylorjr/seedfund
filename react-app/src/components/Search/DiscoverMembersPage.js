import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import ProjectCard from "../Landing/ProjectCard";

const DiscoverMembersPage = (props) => {
  const [projects, setProjects] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const creator = useParams();

  const creator_id = location.state.creator_id;

  if (
    props.user &&
    props.user.firstname + " " + props.user.lastname === creator.member
  ) {
    history.push("/profile");
  }
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/projects/users/${creator_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      if (data) {
        setProjects(data.projects);
      }
    })();
  }, []);

  // props.user &&
  // props.user.firstname + " " + props.user.lastname === creator.member
  //   ? history.push("/profile")
  //   :
  // console.log(projects);

  return projects ? (
    projects.length === 0 ? (
      <section className="query-results__wrapper">
        <div className="query-results__container">
          <div className="query-results__no-results-message">
            '{creator.member} does not currently have any active projects.'
          </div>
        </div>
      </section>
    ) : (
      <>
        <section className="query-results__wrapper">
          <div className="query-results__container">
            <h3 className="query-results__header">
              {"Explore " +
                projects.length +
                (projects.length > 1
                  ? " Projects by " + creator.member
                  : " Project by " + creator.member)}
              {/* {'Explore ' + projects.length + ' ' + (projects.length > 1 ? 'Projects by ' + {creator.member} : 'Project by ' + {creator.member})} */}
            </h3>
            <ul className="query-results__list">
              {projects.map((project, i) => (
                <ProjectCard key={i} data={project} />
              ))}
            </ul>
          </div>
        </section>
      </>
    )
  ) : (
    <>
      <section className="query-results__wrapper">
        <div className="query-results__container">
          <div className="query-results__loading-message">Loading...</div>
        </div>
      </section>
    </>
  );
};

export default DiscoverMembersPage;
