import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";

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

  const fakenewest = [
    {
      id: 6,
      user_id: 1,
      title: "Example Project 6",
      description: "This is an example project",
      funding_goal: 200000.0,
      balance: 384000.0,
      date_goal: "01/31/2021",
      category: "Food",
    },
    {
      id: 7,
      user_id: 1,
      title: "Example Project 7",
      description: "This is an example project",
      funding_goal: 5000000.0,
      balance: 5000.0,
      date_goal: "01/31/2021",
      category: "Film",
    },
    {
      id: 8,
      user_id: 1,
      title: "Example Project 8",
      description: "This is an example project",
      funding_goal: 300000.0,
      balance: 99000.0,
      date_goal: "01/30/2021",
      category: "Tech",
    },
    {
      id: 9,
      user_id: 1,
      title: "Example Project 9",
      description: "This is an example project",
      funding_goal: 6000000.0,
      balance: 950000.0,
      date_goal: "01/30/2021",
      category: "Publishing",
    },
    {
      id: 10,
      user_id: 1,
      title: "Example Project 10",
      description: "This is an example project",
      funding_goal: 600000.0,
      balance: 400000.0,
      date_goal: "01/29/2021",
      category: "Illustration",
    },
    {
      id: 11,
      user_id: 1,
      title: "Example Project 11",
      description: "This is an example project",
      funding_goal: 30000.0,
      balance: 50000.0,
      date_goal: "01/29/2021",
      category: "Dance",
    },
    {
      id: 12,
      user_id: 1,
      title: "Example Project 12",
      description: "This is an example project",
      funding_goal: 3000000.0,
      balance: 1750000.0,
      date_goal: "01/28/2021",
      category: "Fashion",
    },
    {
      id: 13,
      user_id: 1,
      title: "Example Project 13",
      description: "This is an example project",
      funding_goal: 200000.0,
      balance: 50000.0,
      date_goal: "01/27/2021",
      category: "Photography",
    },
    {
      id: 14,
      user_id: 1,
      title: "Example Project 15",
      description: "This is an example project",
      funding_goal: 70000.0,
      balance: 10000.0,
      date_goal: "01/25/2021",
      category: "Theater",
    },
  ];
  // const creator = "Creator Placeholder";

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
