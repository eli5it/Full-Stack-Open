import { type } from "@testing-library/user-event/dist/type";
import countryService from "../services/countries";

const Content = ({ list, setSelectedCountries, weather, fetchWeatherData }) => {
  if (list.length > 10) {
    return <div>Try narrowing your search criteria</div>;
  } else if (list.length === 1) {
    const country = list[0];
    return <RenderCountry country={list[0]} weather={weather}></RenderCountry>;
  } else if (list.length === 0) {
    return <div>No countries found</div>;
  } else {
    return (
      <RenderList
        list={list}
        setSelectedCountries={setSelectedCountries}
        fetchWeatherData={fetchWeatherData}
      ></RenderList>
    );
  }
};

const RenderLanguages = ({ languages }) => {
  return (
    <>
      {languages.map((language) => (
        <RenderLanguage language={language} key={language}></RenderLanguage>
      ))}
    </>
  );
};
const RenderLanguage = ({ language }) => <li>{language}</li>;
const RenderWeather = ({ capital, weather }) => {
  return (
    <>
      <h2>Weather in {capital}</h2>
      <div>temperature {weather.temp} Celsisus</div>
      <img src={weather.iconUrl}></img>
      <div>wind {weather.windSpeed} m/s</div>
    </>
  );
};

const RenderCountry = ({ country, weather }) => {
  const languages = country.languages;
  const languageArray = Object.values(languages);
  const capital = country.capital;
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {capital}</div>
      <div>area {country.area}</div>
      <h4>languages:</h4>
      <RenderLanguages languages={languageArray}></RenderLanguages>
      <img src={country.flags.png}></img>
      <RenderWeather capital={capital} weather={weather}></RenderWeather>
    </div>
  );
};

const RenderList = ({ list, setSelectedCountries, fetchWeatherData }) => {
  return (
    <>
      {list.map((country) => (
        <RenderListItem
          key={country.name.common}
          country={country}
          setSelectedCountries={setSelectedCountries}
          fetchWeatherData={fetchWeatherData}
        ></RenderListItem>
      ))}
    </>
  );
};

const RenderListItem = ({
  country,
  setSelectedCountries,
  fetchWeatherData,
}) => {
  const onClick = (event) => {
    setSelectedCountries([country]);
    fetchWeatherData(country);
  };
  return (
    <div>
      {country.name.common}
      <button onClick={onClick}>show</button>
    </div>
  );
};

export default Content;
