import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import { LinkToStacked } from 'react-stacked-pages-hook';
import * as components from './mdx-components';
import MDXRenderer from './mdx-components/mdx-renderer';
import ReferencesBlock from './references-block';

const Note = (data) => {
  const AnchorTag = (props) => (
    <components.a {...props} references={data.outboundReferences} />
  );

  return (
    <>
      {data.partOf ? (
        <div>
          Part of{' '}
          <LinkToStacked to={data.partOf.slug}>
            {data.partOf.title}
          </LinkToStacked>
        </div>
      ) : null}
      <MDXProvider components={{ ...components, a: AnchorTag }}>
        <MDXRenderer>{data.mdx}</MDXRenderer>
      </MDXProvider>
      <ReferencesBlock references={data.inboundReferences} />
    </>
  );
};

export default Note;
