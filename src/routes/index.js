const express = require("express");
const router = express.Router();

const controllers = require("../controllers");

router.get(
  "/owner/:owner/reponame/:repo/commitid/:cid",
  controllers.getCommitById
);

router.get(
  "/owner/:owner/reponame/:repo/comparecommits",
  controllers.compareCommits
);

module.exports = router;
