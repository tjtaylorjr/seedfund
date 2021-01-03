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

  //Moved this to a utils file so that we can use it in other pages on the site.  Didn't want to just delete your code so commented out instead.

    return queryResult ? (queryResult.length === 0 ? <div>No results</div> :
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
            <Footer />
        </>)
        : <>
            <section className="query-results__wrapper">
                <div className="query-results__container">
                    <div className="query-results__loading-message">Loading...</div>
                </div>
            </section>
            <Footer />
        </>
}

export default DiscoverPage;
