import { useState } from 'react';
import fetchAdvancedUserData from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'location') setLocation(value);
    if (name === 'minRepos') setMinRepos(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const query = {
        username,
        location,
        minRepos,
      };
      const data = await fetchAdvancedUserData(query);
      setUserData(data.items); // GitHub API returns search results in 'items'
    } catch (err) {
      setError('No users found matching the criteria.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col items-center space-y-4">
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleInputChange}
          placeholder="Username"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          value={location}
          onChange={handleInputChange}
          placeholder="Location"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="minRepos"
          value={minRepos}
          onChange={handleInputChange}
          placeholder="Min Repositories"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {userData && userData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userData.map((user) => (
            <div key={user.id} className="border p-4 rounded shadow">
              <img src={user.avatar_url} alt={user.login} className="w-24 h-24 rounded-full mx-auto" />
              <h2 className="text-xl font-bold mt-2 text-center">{user.login}</h2>
              {user.location && <p className="text-center text-gray-600">Location: {user.location}</p>}
              <p className="text-center">Repos: {user.public_repos}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 block text-center"
              >
                Visit GitHub Profile
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
