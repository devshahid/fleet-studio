const express = require("express");
// const axios = require("axios");
const { setHeaders } = require("./middlewares/headers");
const app = express();
require("dotenv").config();
const routes = require("./routes/index");
app.use(setHeaders);

app.use("/api/", routes);
// Endpoint to get details about a commit by ID
// app.get("/commit/:commitId", async (req, res) => {
//   try {
//     const commitId = req.params.commitId;
//     // Use the GitHub API to fetch commit details by ID
//     const response = await axios.get(
//       `https://api.github.com/repos/owner/repo/commits/${commitId}`
//     );
//     const commitDetails = response.data;
//     res.json(commitDetails);
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred" });
//   }
// });

// // Endpoint to get the diff of a commit from the previous one
// app.get("/commit/:commitId/diff", async (req, res) => {
//   try {
//     const commitId = req.params.commitId;
//     // Use the GitHub API to fetch commit comparison
//     const response = await axios.get(
//       `https://api.github.com/repos/owner/repo/compare/${commitId}~1...${commitId}`
//     );
//     const commitDiff = response.data;
//     res.json(commitDiff);
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred" });
//   }
// });

module.exports = app;
