import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectCard from "../Project/ProjectCard";

const DiscoverPage = () => {
  const [queryResult, setQueryResult] = useState([]);
  const [queryString, setQueryString] = useState("");

  const { query } = useParams();

  useEffect(() => {
    if (query) {
      setQueryString(query);
    }
  }, [query]);

  useEffect(() => {
    const searchFilter = (() => {
        const params = query.split(" ");
        const badSearchTerms = ["a", "an", "the", "if", "or", "but", "and", "for", "nor", "yet", "so", "at", "by", "from", "in", "into", "of", "on", "to", "with", "is"];
        const filtered_query = params.filter(param => {
            return badSearchTerms.indexOf(param) === -1;
        });
        return filtered_query;
    })();

    let allProjects = []
    searchFilter.map(async(searchTerm) => {
      (async () => {
        const res = await fetch(`/api/projects/search/${searchTerm}`);
        if(!res.ok) {
          throw res
        }
        const json = await res.json();

        if(json.projects.length > 0) {
          allProjects = [...allProjects, ...json.projects]
        }

        const uniqueResults = (() => {
          const checkProp = allProjects.map(obj => obj['id']);
          return allProjects.filter((obj, idx) => {
            return checkProp.indexOf(obj['id']) === idx;
          })
        })()

        setQueryResult(uniqueResults)
      })();
    });

  }, [queryString]);

  return queryResult ? (queryResult.length === 0 ?
    <section className="query-results__wrapper">
      <div className="query-results__container">
        <div className="query-results__no-results-message">Sorry! No results found for '{query}'.</div>
      </div>
    </section> :
    <>
     <section className="query-results__wrapper">
        <div className="query-results__container">
          <h3 className="query-results__header">
            {'Explore ' + queryResult.length + (queryResult.length > 1 ? ' Projects' : ' Project')}
          </h3>
          <ul className='query-results__list'>
            {queryResult.map((project, i) => (
                <ProjectCard key={i} data={project} />
            ))}
          </ul>
        </div>
      </section>
    </>) :
    <>
      <section className="query-results__wrapper">
        <div className="query-results__container">
          <div className="query-results__loading-message">Loading...</div>
        </div>
      </section>
    </>
}

export default DiscoverPage;
