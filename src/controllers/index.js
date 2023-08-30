// created Api instance with pre configuration of base url and headers
const { Api } = require("../config/axios");

// Get user details by username
const getUser = async (req, res) => {
  try {
    const user = req.params.user;
    const response = await Api.get(`/users/${user}`);
    const data = response.data;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong", error });
  }
};

// Get commit details by commit ID
const getCommitById = async (req, res) => {
  try {
    const { owner, repo, cid } = req.params;
    const response = await Api.get(`/repos/${owner}/${repo}/commits/${cid}`);
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

// Compare commits between two branches
const compareCommits = async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const { baseBranch, headBranch } = req.query;
    const response = await Api.get(
      `/repos/${owner}/${repo}/compare/${baseBranch}...${headBranch}`
    );
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

// Get list of all branches
const getAllBranches = async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const response = await Api.get(`/repos/${owner}/${repo}/branches`);
    if (response.data.length > 0) return res.status(200).json(response.data);
    else return res.status(200).json({ message: "No Branch found" });
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong", error });
  }
};

module.exports = { getUser, getCommitById, compareCommits, getAllBranches };
