exports.constants = Object.freeze({
  hostname: "https://api.github.com",
  user_agent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36",
  error_message: "Something went wrong",
});

const generateOptions = (_path) => {
  return (options = {
    hostname: this.constants.hostname,
    path: _path,
    headers: {
      "User-Agent": this.constants.user_agent,
    },
    OAUth: process.env.GITHUB_ACCESS_TOKEN,
  });
};

module.exports = { generateOptions };
