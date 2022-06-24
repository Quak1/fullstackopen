import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const authHeader = () => {
  const token = JSON.parse(window.localStorage.getItem("loggedUser")).token;
  return {
    headers: { Authorization: `bearer ${token}` },
  };
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (newBlog) => {
  let token = JSON.parse(window.localStorage.getItem("loggedUser")).token;
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const update = async (updatedBlog, blogId) => {
  const config = authHeader();
  const res = await axios.put(`${baseUrl}/${blogId}`, updatedBlog, config);
  return res.data;
};

export default { getAll, setToken, create, update };
