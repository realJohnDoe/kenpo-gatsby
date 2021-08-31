const Remark = require(`remark`);
const plugin = require(`../index.js`);

const remark = new Remark().data(`settings`, {
  commonmark: true,
  footnotes: true,
  pedantic: true,
});

const md1 = `[[xyz]]`;

const md3 = `
# Hello World

- Two [[next]] [[to]] each other
- [[link]] to
- another [[page]]

[[yes]]
`;

async function main() {
  const markdownAST = remark.parse(md3);

  const transformed = await plugin({
    markdownAST: Object.assign({}, markdownAST),
  });

  console.log(JSON.stringify(transformed, null, 2));
}

main();
