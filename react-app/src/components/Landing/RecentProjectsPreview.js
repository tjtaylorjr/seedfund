import React, { useState, useEffect } from "react";
import ProjectCard from "../Project/ProjectCard";

const RecentProjectsPreview = () => {
  const [newest, setNewest] = useState([]);

  useEffect(() => {
    let data;
    (async () => {
      const res = await fetch("/api/projects/newest", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await res.json();
      if (data) {
        setNewest(data.newest_projects);
      }
    })();
  }, []);

  let databaseInfo;

  if (newest) {
    databaseInfo = newest;
  } else {
    databaseInfo = fakenewest;
  }

  return (
    <>
      <div className="recent-projects">
        <div className="recent-projects__wrapper">
          <h3 className="recent-projects__header">Latest Projects</h3>
          <ul className="recent-projects__list">
            {databaseInfo.map((project, i) => (
              <ProjectCard key={i} data={project} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default RecentProjectsPreview;
