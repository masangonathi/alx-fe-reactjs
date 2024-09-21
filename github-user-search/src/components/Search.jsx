// src/components/Search.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import fetchUserData from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

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
    setUserData([]);
    setPage(1);

    try {
      const query = {
        username,
        location,
        minRepos,
        page: 1,
      };
      const data = await fetchUserData(query);
      setUserData(data.items);
      setHasMore(data.total_count > data.items.length);
    } catch (err) {
      setError('No users found matching the criteria.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    setError(null);

    try {
      const query = {
        username,
        location,
        minRepos,
        page: nextPage,
      };
      const data = await fetchUserData(query);
      setUserData((prevData) => [...prevData, ...data.items]);
      setPage(nextPage);
      setHasMore(data.total_count > (page * 30) + data.items.length);
    } catch (err) {
      setError('Failed to load more users.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-6 w-full max-w-lg">
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          {/* Username Input */}
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
            placeholder="Username"
            className="border border-gray-300 rounded-lg p-2 mb-4 sm:mb-0 flex-1"
          />
          {/* Location Input */}
          <input
            type="text"
            name="location"
            value={location}
            onChange={handleInputChange}
            placeholder="Location"
            className="border border-gray-300 rounded-lg p-2 mb-4 sm:mb-0 flex-1"
          />
          {/* Minimum Repositories Input */}
          <input
            type="number"
            name="minRepos"
            value={minRepos}
            onChange={handleInputChange}
            placeholder="Min Repositories"
            className="border border-gray-300 rounded-lg p-2 mb-4 sm:mb-0 flex-1"
            min="0"
          />
        </div>
        {/* Error Message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 mt-4"
        >
          Search
        </button>
      </form>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Search Results */}
      {userData && userData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {userData.map((user) => (
            <div key={user.id} className="border p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              {/* User Avatar */}
              <img src={user.avatar_url} alt={user.login} className="w-24 h-24 rounded-full mx-auto" />
              {/* User Name */}
              <h2 className="text-xl font-bold text-center mt-2">{user.name || user.login}</h2>
              {/* User Location */}
              {user.location && <p className="text-center text-gray-600">Location: {user.location}</p>}
              {/* User Repositories Count */}
              <p className="text-center">Repos: {user.public_repos}</p>
              {/* GitHub Profile Link */}
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 block text-center mt-2"
              >
                Visit GitHub Profile
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <button
          onClick={handleLoadMore}
          className="mt-6 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default Search;
