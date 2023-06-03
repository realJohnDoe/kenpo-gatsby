const path = require("path");

require("dotenv").config({
  path: `.env`,
});

module.exports = {
  pathPrefix: `/kenpo-gatsby`,
  siteMetadata: {
    title: `Johannes' Kenpo notes`,
    description: `Johannes' Kenpo notes rendered beautifully using Gatsby`,
  },
  plugins: [
    {
      resolve: `gatsby-philipps-foam-theme`,
      options: {
        contentPath: `${__dirname}/../docs`,
        rootNote: "index",
        ignore: ["**/private/**/*"],
      },
    },
  ],
};
