import axios from 'axios';
const baseUrl = 'https://restcountries.com/v3.1/name/';

const getCountry = async (name) => {
  const response = await axios.get(`${baseUrl}${name}?fullText=true`);
  return response.data[0];
};

export default { getCountry };
