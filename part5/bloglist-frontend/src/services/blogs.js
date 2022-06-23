import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

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

export default { getAll, setToken, create };

