import axios from 'axios';
const baseUrl = '/todos';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const mark = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}`, { done: true });
  return response.data;
};

export default { getAll, create, mark };
