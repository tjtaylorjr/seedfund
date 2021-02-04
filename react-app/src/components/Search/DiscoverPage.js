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

  const filteredSearch = (() => {
    const params = query.split(" ");
    const queryFilter1 = params.filter(param => {
      return param.length > 0;
    })
    const badSearchTerms = ["a", "an", "the", "if", "or", "but", "and", "for", "nor", "yet", "so", "at", "by", "from", "in", "into", "of", "on", "to", "with", "is"];
    const queryFilter2 = queryFilter1.filter(param => {
      return badSearchTerms.indexOf(param) === -1;
    });
    const formattedSearchTerms = queryFilter2.join('+');
    console.log(formattedSearchTerms)
    return formattedSearchTerms;
  })();

  useEffect(() => {
    let mounted = true;

      (async () => {
        const res = await fetch(`/api/projects/search/${filteredSearch}`);
        if (!res.ok) {
          throw res
        }
        const {projects} = await res.json();

        console.log(projects)
        const uniqueResults = (() => {
          const checkProp = projects.map(obj => obj['id']);
          return projects.filter((obj, idx) => {
            return checkProp.indexOf(obj['id']) === idx;
          })
        })()
        if(mounted) {
          setQueryResult(uniqueResults)
        }
      })();

    return () => mounted = false;
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
