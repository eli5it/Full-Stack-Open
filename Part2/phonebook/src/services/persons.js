import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (person) => {
  console.log(person);
  const request = axios.delete(`${baseUrl}/${person.id}`, {});
  return request.then();
};

// person is the new object which will replace the object found at baseurl/personID
const replace = (person, id) => {
  const request = axios.put(`${baseUrl}/${id}`, person);
  return request.then((response) => response.data);
};

export default { create, getAll, deletePerson, replace };
