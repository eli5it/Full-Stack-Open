import { type } from "@testing-library/user-event/dist/type";

const Content = ({ list, setSelectedCountries }) => {
  if (list.length > 10) {
    return <div>Try narrowing your search criteria</div>;
  } else if (list.length === 1) {
    return <RenderCountry country={list[0]}></RenderCountry>;
  } else if (list.length === 0) {
    return <div>No countries found</div>;
  } else {
    return (
      <RenderList
        list={list}
        setSelectedCountries={setSelectedCountries}
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

const RenderCountry = ({ country }) => {
  const languages = country.languages;
  const languageArray = Object.values(languages);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h4>languages:</h4>
      <RenderLanguages languages={languageArray}></RenderLanguages>
      <img src={country.flags.png}></img>
    </div>
  );
};

const RenderList = ({ list, setSelectedCountries }) => {
  return (
    <>
      {list.map((country) => (
        <RenderListItem
          key={country.name.common}
          country={country}
          setSelectedCountries={setSelectedCountries}
        ></RenderListItem>
      ))}
    </>
  );
};

const RenderListItem = ({ country, setSelectedCountries }) => {
  const onClick = (event) => {
    setSelectedCountries([country]);
  };
  return (
    <div>
      {country.name.common}
      <button onClick={onClick}>show</button>
    </div>
  );
};

export default Content;
