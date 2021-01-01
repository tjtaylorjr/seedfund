import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectCard from './ProjectCard';

const DiscoverPage = () => {

    const [queryResult, setqueryResult] = useState([]);
    const { query } = useParams();

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/projects/search/${query}`);
            const json = await res.json();
            setqueryResult(json.projects);
        })()
    }, [])

    return queryResult.length ? (
        <ul className='query-results'>
            {queryResult.length === 0 ?
                <div>No results found!</div> :
                queryResult.map(result => <ProjectCard key={result.id} data={result} />)}
        </ul>
    ) : <div>Loading...</div>
}

export default DiscoverPage;