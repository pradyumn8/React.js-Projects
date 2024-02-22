import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

function Github() {
  const userData = useLoaderData();
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    fetch(userData.repos_url)
      .then(response => response.json())
      .then(repos => {
        setRepositories(repos);
      })
      .catch(error => {
        console.error('Error fetching repositories:', error);
      });
  }, [userData.repos_url]);

  const [commitCounts, setCommitCounts] = useState({});

  useEffect(() => {
    const fetchCommitsCount = async (repo) => {
      const response = await fetch(`https://api.github.com/repos/${userData.login}/${repo.name}/commits`);
      const commits = await response.json();
      return commits.length;
    };

    const fetchAllCommitCounts = async () => {
      const counts = {};
      for (const repo of repositories) {
        counts[repo.name] = await fetchCommitsCount(repo);
      }
      setCommitCounts(counts);
    };

    if (repositories.length > 0) {
      fetchAllCommitCounts();
    }
  }, [repositories, userData.login]);

  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
      <div>Github followers: {userData.followers}</div>
      <img src={userData.avatar_url} alt="Git picture" width={300} />
      <div className="mt-4">
        <h2>Public Repositories:</h2>
        <ul>
          {repositories.map(repo => (
            <li key={repo.id}>
              <strong>{repo.name}</strong>: {repo.description}<br />
              Total Commits: <span>{commitCounts[repo.name]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Github;

export const githubInfoLoader = async () => {
  const response = await fetch('https://api.github.com/users/pradyumn8');
  return response.json();
};
