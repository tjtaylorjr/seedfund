import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectCard from "./ProjectCard";

const DiscoverPage = () => {
  const [queryResult, setqueryResult] = useState([]);
  const [queryString, setQueryString] = useState("");

  const { query } = useParams();

  useEffect(() => {
    if (query) {
      setQueryString(query);
    }
  }, [query]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/projects/search/${query}`);
      const json = await res.json();
      setqueryResult(json.projects);
    })();
  }, [queryString]);

  return queryResult ? (
    queryResult.length === 0 ? (
      <section className="query-results__wrapper">
        <div className="query-results__container">
          <div className="query-results__no-results-message">
            Sorry! No results found for '{query}'.
          </div>
        </div>
      </section>
    ) : (
      <>
        <section className="query-results__wrapper">
          <div className="query-results__container">
            <h3 className="query-results__header">
              {"Explore " +
                queryResult.length +
                (queryResult.length > 1 ? " Projects" : " Project")}
            </h3>
            <ul className="query-results__list">
              {queryResult.map((project, i) => (
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

export default DiscoverPage;
