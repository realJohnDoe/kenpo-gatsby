import { graphql, useStaticQuery } from 'gatsby';

export default () => {
  const data = useStaticQuery(graphql`
    {
      allFile(filter: { ext: { in: [".md", ".mdx"] } }) {
        nodes {
          name
          relativePath
          fields {
            title
          }
          childMdx {
            body
          }
        }
      }
    }
  `);

  const pages = data.allFile.nodes.map((node) => ({
    name: node.name,
    href: node.relativePath.replace(/\.md|\.mdx/, ''),
    title: node.fields.title,
    mdx: node.childMdx.body,
  }));

  const getPage = (pageName) => pages.find((p) => p.name === pageName);

  return { pages, getPage };
};
