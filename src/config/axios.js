const axios = require("axios");

// creating the axios instance with pre configuration like base url and headers
const Api = axios.create({
  baseURL: "https://api.github.com",
  Headers: {
    Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
  },
});

module.exports = { Api };
