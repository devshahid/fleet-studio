// importing http module of nodejs to create a http server
const http = require("http");

// importing app instance of express application
const app = require("./src/app");

// creating http server and binding express app
const server = http.createServer(app);

// Port in which the server will run
const PORT = 5000;

// initialized the server on specific port
server.listen(PORT, () => console.log(`Server running at ${PORT}`));
