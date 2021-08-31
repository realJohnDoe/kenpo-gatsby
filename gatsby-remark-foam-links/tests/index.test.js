const Remark = require(`remark`);
const visit = require('unist-util-visit');
const plugin = require(`../index.js`);

const remark = new Remark().data(`settings`, {
  commonmark: true,
  footnotes: true,
  pedantic: true,
});

describe(`gatsby-remark-foam-links`, () => {
  it(`should transform simple link`, async () => {
    const markdownAST = remark.parse(`[[yes]]`);

    const transformed = await plugin({
      markdownAST: Object.assign({}, markdownAST),
    });

    visit(markdownAST, 'html', (node) => {
      expect(node.value).toEqual(`<FoamLink>yes</FoamLink>`);
    });
  });

  it(`should slice prefix`, async () => {
    const markdownAST = remark.parse(`one [[two]] three`);

    const transformed = await plugin({
      markdownAST: Object.assign({}, markdownAST),
    });

    visit(markdownAST, 'html', (node, index, parent) => {
      const siblings = parent?.children;
      const previous = siblings[index - 1];

      expect(previous.value).toEqual(`one `);
    });
  });

  it(`should slice suffix`, async () => {
    const markdownAST = remark.parse(`one [[two]] three`);

    const transformed = await plugin({
      markdownAST: Object.assign({}, markdownAST),
    });

    visit(markdownAST, 'html', (node, index, parent) => {
      const siblings = parent?.children;
      const next = siblings[index + 1];

      expect(next.value).toEqual(` three`);
    });
  });

  it(`should find 5 links`, async () => {
    const markdownAST = remark.parse(`
# Hello World

- Two [[next]] [[to]] each other
- [[link]] to
- another [[page]]

[[yes]]`);

    const transformed = await plugin({
      markdownAST: Object.assign({}, markdownAST),
    });

    let count = 0;

    visit(markdownAST, 'html', (node, index, parent) => {
      count += 1;
      return;
    });
    expect(count).toEqual(5);
  });

  it(`should find 10 links`, async () => {
    const markdownAST = remark.parse(`
# Digital Garden Using Foam

This is an example with links

- [[cool]]
- [[code]]
- [[text]]
- [[images]]
- [[one]]
- [[headings]]
- [[many-headings]]
- [[webcomponents]]

Excluded files:

- [[secret-nuclear-codes]]
- [[my-passwords]]`);

    const transformed = await plugin({
      markdownAST: Object.assign({}, markdownAST),
    });

    let count = 0;

    visit(markdownAST, 'html', (node, index, parent) => {
      count += 1;
      return;
    });
    expect(count).toEqual(10);
  });
});
