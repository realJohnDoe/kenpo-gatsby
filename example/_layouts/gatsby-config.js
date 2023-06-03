const path = require("path");

require("dotenv").config({
  path: `.env`,
});

module.exports = {
  pathPrefix: `/kenpo-gatsby`,
  siteMetadata: {
    title: `Philipps Foam Template`,
    description: `Example of using Philipps Foam Template for a Gatsby site`,
  },
  plugins: [
    {
      resolve: `gatsby-philipps-foam-theme`,
      options: {
        contentPath: `${__dirname}/../docs`,
        rootNote: "readme",
        ignore: ["**/private/**/*"],
      },
    },
  ],
};
