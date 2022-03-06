import axios from "axios";
const api_key = process.env.REACT_APP_API_KEY;

const getWeather = (coordinates) => {
  const lat = coordinates[0],
    long = coordinates[1];
  const link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`;
  const request = axios.get(link);
  return request.then((response) => response.data);
};

export default { getWeather };
