import { MDXProvider } from '@mdx-js/react';
import Tippy from '@tippyjs/react';
import 'tippy.js/animations/shift-away.css';
import { graphql, useStaticQuery, withPrefix } from 'gatsby';
import React from 'react';
import { LinkToStacked } from 'react-stacked-pages-hook';
// import './anchor-tag.css';
import MDXRenderer from './mdx-renderer';

const custBasename = (filePath) => {
  const split = filePath.split('/');
  return split[split.length - 1];
};

function isLinkToExcludedPage({ href, withoutLink, title, content }) {
  const hrefPathaArray = href.split('/');
  const last = hrefPathaArray[hrefPathaArray.length - 1];

  // strange but with that we can be sure that it points to an excluded page
  if (withoutLink === undefined && title && last === content) {
    return true;
  }

  return false;
}

export const AnchorTag = ({
  title,
  href,
  references = [],
  withoutLink,
  withoutPopup,
  ...restProps
}) => {
  console.log('references', references);

  // same as in gatsby-transformer-markdown-references/src/compute-inbounds.ts#getRef
  const ref = references.find(
    (x) =>
      withPrefix(x.slug) === withPrefix(href) ||
      x.title === title ||
      (x.aliases || []).some((alias) => alias === title) ||
      custBasename(x.slug) === title
  );

  let content;
  let popupContent;
  let child;

  if (ref) {
    const nestedComponents = {
      a(props) {
        return <AnchorTag {...props} references={references} withoutLink />;
      },
      p(props) {
        return <span {...props} />;
      },
    };
    content =
      ref.title === ref.displayTitle ? (
        restProps.children
      ) : (
        <MDXProvider components={nestedComponents}>
          <MDXRenderer>{ref.mdx}</MDXRenderer>
        </MDXProvider>
      );
    popupContent = (
      <div id={ref.id} className="tw-popover">
        {ref.title === ref.displayTitle ? (
          <React.Fragment>
            <MDXProvider components={nestedComponents}>
              <MDXRenderer>{ref.mdx}</MDXRenderer>
            </MDXProvider>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h5>{ref.displayTitle}</h5>
            <ul>
              <li>
                <MDXProvider components={nestedComponents}>
                  <MDXRenderer>{ref.mdx}</MDXRenderer>
                </MDXProvider>
              </li>
            </ul>
          </React.Fragment>
        )}
      </div>
    );
    child = (
      <LinkToStacked {...restProps} to={ref.slug} title={title}>
        {content}
      </LinkToStacked>
    );
  } else {
    console.log('no ref => ', {
      href,
      title,
      withoutLink,
      withoutPopup,
      children: restProps.children,
    });
    console.log('restprops =>', restProps);

    content = restProps.children;

    const hrefPathaArray = href.split('/');
    const last = hrefPathaArray[hrefPathaArray.length - 1];

    if (isLinkToExcludedPage({ href, withoutLink, title, content })) {
      return (
        <span className="px-1 rounded bg-skin-secondary text-skin-secondary cursor-not-allowed tracking-wide">
          excluded page
        </span>
      );
    }

    if (withoutLink) {
      return <span>{content}</span>;
    }

    if (withoutPopup) {
      return child;
    }

    popupContent = <div className="tw-popover">{href}</div>;
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    child = (
      <a
        {...restProps}
        href={
          !href || (href.indexOf && href.indexOf('#') === 0)
            ? href
            : withPrefix(href)
        }
        title={title}
      />
    );
  }

  return (
    <Tippy
      animation="shift-away"
      content={popupContent}
      maxWidth="none"
      arrow={true}
    >
      {child}
    </Tippy>
  );
};
