const BASE_URL = 'http://localhost:3200/api/v1';
const API_KEY = 'LhPRmQ2iKnQsGpAanoyAU8c3qgc4fydlcw9Z';

function getHeaders() {
  const token = localStorage.getItem('token');

  return {
    ApiKey: API_KEY,
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  };
}

export default {
  BASE_URL,
  API_KEY,
  getHeaders,
};
