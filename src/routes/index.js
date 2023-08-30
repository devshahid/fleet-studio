/**
 * Commit Diff API Endpoints
 * @module routes/commitDiff
 */

// creating the instance of the express server
const express = require("express");

// creating the router instance from the express server
const router = express.Router();

// importing controller to handle all the matched routes
const controllers = require("../controllers");

/**
 * Get User by Username
 * @route GET /user/:user
 * @param {string} user - GitHub username of the user
 * @returns {object} User details
 * @throws {Error} 404 - Not Found error
 */
router.get("/user/:user", controllers.getUser);

/**
 * Get Commit by ID
 * @route GET /owner/:owner/repo/:repo/commitid/:cid
 * @param {string} owner - Owner of the GitHub repository
 * @param {string} repo - Repository name
 * @param {string} cid - Commit ID
 * @returns {object} Commit details
 * @throws {Error} 404 - Not found error
 */
router.get("/owner/:owner/repo/:repo/commitid/:cid", controllers.getCommitById);

/**
 * Compare Commits
 * @route GET /owner/:owner/repo/:repo/comparecommits
 * @param {string} owner - Owner of the GitHub repository
 * @param {string} repo - Repository name
 * @param {string} baseBranch - query parameter Base branch for comparison
 * @param {string} headBranch - query parameter Head branch for comparison
 * @returns {object} Commit comparison details
 * @throws {Error} 404 - Not found error
 */
router.get(
  "/owner/:owner/repo/:repo/comparecommits",
  controllers.compareCommits
);

/**
 * Get All Branches of a Repository
 * @route GET /owner/:owner/repo/:repo/branches
 * @param {string} owner - Owner of the GitHub repository
 * @param {string} repo - Repository name
 * @returns {object} List of repository branches
 * @throws {Error} 404 - Not found
 */
router.get("/owner/:owner/repo/:repo/branches", controllers.getAllBranches);

module.exports = router;
