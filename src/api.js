import axios from 'axios';

const BASE_URL = 'https://internshala.com/hiring/search';

export const fetchInternships = async () => {
  const response = await axios.get(BASE_URL);
  // Assuming the API returns an array of internship objects
  return response.data;
};
