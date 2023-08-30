const { generateOptions } = require("../helpers/util");
const axios = require("axios");
const getUser = async (req, res) => {
  try {
    const user = req.params.user;
    const options = generateOptions("/users/" + user);
    const response = await axios.get(`${options.hostname}${options.path}`, {
      Headers: {
        ...options.headers,
        Authorization: `Bearer ${options.OAUth}`,
      },
    });
    const data = response.data;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong", error });
  }
};

const getRepo = async (req, res) => {
  try {
    const user = req.params.user;
    const reponame = req.params.reponame;
    const options = generateOptions("/repos/" + user + "/" + reponame);
    const response = await axios.get(`${options.hostname}${options.path}`, {
      Headers: {
        ...options.headers,
        Authorization: `Bearer ${options.OAUth}`,
      },
    });
    const data = response.data;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong", error });
  }
};

const getCommitById = async (req, res) => {
  try {
    const { owner, repo, cid } = req.params;
    const options = generateOptions(`/repos/${owner}/${repo}/commits/${cid}`);
    const response = await axios.get(`${options.hostname}${options.path}`, {
      Headers: {
        ...options.headers,
        Authorization: `Bearer ${options.OAUth}`,
      },
    });
    const { sha: oid, parents, author, committer, commit } = response.data;

    const parentCommit = parents.map((item) => {
      return { oid: item.sha };
    });
    const data = [
      {
        oid,
        parents: parentCommit,
        author: { ...commit.author, avtarUrl: author.avatar_url },
        committer: {
          ...commit.committer,
          committerAvtar: committer.avatar_url,
        },
      },
    ];
    if (commit.message && commit.message.includes("\n\n")) {
      const [subject, body] = commit.message.split("\n\n");
      data[0].subject = subject;
      data[0].body = body;
    } else {
      data[0].message = commit.message;
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong", error });
  }
};

const compareCommits = async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const { baseBranch, headBranch } = req.query;
    const options = generateOptions(
      `/repos/${owner}/${repo}/compare/${baseBranch}...${headBranch}`
    );
    const response = await axios.get(`${options.hostname}${options.path}`, {
      Headers: {
        ...options.headers,
        Authorization: `Bearer ${options.OAUth}`,
      },
    });
    const { files } = response.data;
    const data = files.map((item) => {
      return {
        changeKind: item.status.toUpperCase(),
        headFile: { path: item.blob_url },
        baseFile: { path: item.blob_url },
        hunks: [
          {
            header: item.patch,
          },
        ],
      };
    });
    if (data.length > 0) return res.status(200).json(data);
    else return res.status(200).json({ message: "No difference found" });
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong", error });
  }
};

module.exports = { getUser, getRepo, getCommitById, compareCommits };
