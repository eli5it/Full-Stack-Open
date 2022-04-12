import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
let config;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  config = {
    headers: {
      Authorization: token,
    },
  };
};

const getAll = async () => {
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const addLike = async (blogToUpdate) => {
  blogToUpdate.likes++;
  // need to find blog id
  const newURL = `${baseUrl}/${blogToUpdate.id}`;
  const response = await axios.put(newURL, blogToUpdate, config);
  return response.data;
};
export default { getAll, create, setToken, addLike };
