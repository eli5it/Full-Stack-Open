import { useEffect, useState } from "react";
import axios from "axios";
import Content from "./components/Content";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  // maximum countries specified by search query
  const maxCountries = 10;
  // returns array of country objects matching the search query
  const filterCountries = (filter) => {
    const filteredCountries = countries.filter((country) => {
      const upCasedName = country.name.common.toUpperCase();
      return upCasedName.includes(filter.toUpperCase());
    });
    setSelectedCountries(filteredCountries);
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
      <Content list={selectedCountries} filter={filter}></Content>
    </div>
  );
};

export default App;
