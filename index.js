const http = require("http");
const app = require("./src/app");
const server = http.createServer(app);

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running at ${PORT}`));
