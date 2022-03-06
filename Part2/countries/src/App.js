import { useEffect, useState } from "react";
import axios from "axios";
import Content from "./components/Content";
import countryService from "./services/countries";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [weather, setWeather] = useState({});

  const fetchWeatherdata = (country) => {
    const coordinates = country.capitalInfo.latlng;
    countryService.getWeather(coordinates).then((data) => {
      const degressCelsius = Math.round(data.main.temp - 273.15);
      const windSpeed = data.wind.speed;
      const weatherIcon = data.weather[0].icon;
      console.log(weatherIcon);
      const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      const weatherObject = {
        temp: degressCelsius,
        windSpeed: windSpeed,
        iconUrl: iconUrl,
      };
      setWeather(weatherObject);
    });
  };

  const filterCountries = (filter) => {
    const filteredCountries = countries.filter((country) => {
      const upCasedName = country.name.common.toUpperCase();
      return upCasedName.includes(filter.toUpperCase());
    });
    setSelectedCountries(filteredCountries);
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      fetchWeatherdata(country);
    }
  };
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      setSelectedCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    filterCountries(event.target.value);
  };

  return (
    <div>
      find countries
      <input type={"search"} onChange={handleFilterChange}></input>
      <div>{inputMessage}</div>
      <Content
        list={selectedCountries}
        setSelectedCountries={setSelectedCountries}
        weather={weather}
        fetchWeatherData={fetchWeatherdata}
      ></Content>
    </div>
  );
};

export default App;
