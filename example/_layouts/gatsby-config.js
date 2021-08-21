const path = require("path");

require("dotenv").config({
  path: `.env`,
});

module.exports = {
  pathPrefix: `/gatsby-philipps-foam-theme`,
  siteMetadata: {
    title: `Philipps Foam Template`,
    description: `Example of using Philipps Foam Template for a Gatsby site`,
  },
  plugins: [
    {
      resolve: `gatsby-philipps-foam-theme`,
      options: {
        rootNote: "/readme",
        contentPath: `${__dirname}/..`,
        ignore: [
          "**/_layouts/**",
          "**/.git/**",
          "**/.github/**",
          "**/.vscode/**",
          "**/private/**",
        ],
      },
    },
  ],
};
