// src/services/githubService.js
import axios from 'axios';

const SEARCH_API_URL = 'https://api.github.com/search/users';

const fetchAdvancedUserData = async ({ username, location, minRepos, page = 1 }) => {
  let query = '';

  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos} `;

  // Trim any trailing spaces
  query = query.trim();

  try {
    const response = await axios.get(SEARCH_API_URL, {
      params: {
        q: query || 'type:user', // Default to 'type:user' if no query is provided
        page,
        per_page: 30, // Number of results per page
      },
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${process.env.REACT_APP_GITHUB_API_KEY}`,
      },
    });

    // Fetch additional user details like location and public_repos
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        const userDetails = await axios.get(user.url, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            
          },
        });
        return { ...user, ...userDetails.data };
      })
    );

    return {
      items: usersWithDetails,
      total_count: response.data.total_count,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch user data');
  }
};

export default fetchAdvancedUserData;
