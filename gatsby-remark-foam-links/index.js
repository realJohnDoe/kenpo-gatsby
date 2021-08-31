const visit = require('unist-util-visit');

function siblingsValid(previous, next) {
  if (
    !previous ||
    previous.type !== 'text' ||
    !previous.value ||
    !next ||
    next.type !== 'text' ||
    !next.value
  ) {
    return false;
  }

  const prevBracket = /\[$/.test(previous.value);
  const nextBracket = /^\]/.test(next.value);

  return prevBracket && nextBracket;
}

module.exports = async ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, 'linkReference', (node, index, parent) => {
    const linkText = node?.children?.[0]?.value;
    if (!linkText) return;

    const siblings = parent?.children;
    const previous = siblings[index - 1];
    const next = siblings[index + 1];

    if (!siblingsValid(previous, next)) {
      return;
    }

    previous.value = previous.value.replace(/\[$/, '');
    next.value = next.value.replace(/^\]/, '');

    const html = `<FoamLink>${linkText}</FoamLink>`;
    node.type = 'html';
    node.children = undefined;
    node.value = html;
  });
  return markdownAST;
};
