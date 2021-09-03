# gatsby-remark-foam-links

Transforms Foam links to the mdx component `FoamLink`.

```sh
[[my-link-text]] -> <FoamLink>my-link-text</FoamLink>
```

You can then create your own component to handle links.

## Usage

[![NPM](https://nodei.co/npm/gatsby-remark-foam-links.png)](https://nodei.co/npm/gatsby-remark-foam-links/)

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-foam-links`,
      ],
    },
  },
],
```
