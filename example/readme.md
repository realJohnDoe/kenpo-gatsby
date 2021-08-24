# Setup

The Gatsby site is located in `_layouts`.

All foam related files are placed in the `docs` folder.

In the `gatsby-config.js` we point to the `docs` folder for the content. Note that all necessary assets need to be in there.

The `rootNote` is the main page of the site. Set it relatively from the `contentPath`.

You can put an ignore array to exclude pages from the build.

```js
 plugins: [
    {
      resolve: `gatsby-philipps-foam-theme`,
      options: {
        contentPath: `${__dirname}/../docs`,
        rootNote: "/index",
        ignore: ["**/private/**/*"],
      },
    },
  ],
```
