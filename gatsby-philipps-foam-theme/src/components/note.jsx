import { MDXProvider } from '@mdx-js/react';
import React, { useState } from 'react';
import { LinkToStacked } from 'react-stacked-pages-hook';
import * as components from './mdx-components';
import MDXRenderer from './mdx-components/mdx-renderer';
import ReferencesBlock from './references-block';

const HeadingButton = ({ headings }) => {
  const [shown, setShown] = useState(false);
  const filtertedHeadings = headings.filter((h) => h.depth !== 1);

  if (filtertedHeadings.length === 0) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="mr-4 px-3 -ml-3 rounded focus:outline-none focus:ring focus:ring-blue-500"
        onClick={() => setShown(!shown)}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </button>
      <ul
        onClick={() => setShown(false)}
        className={`${
          shown ? 'visible' : 'hidden'
        } absolute mt-1 bg-white dark:bg-gray-900 shadow-lg max-h-60 !list-none
        rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm`}
        tabIndex="-1"
      >
        {filtertedHeadings.map((h) => (
          <a href={`#${h.value}`} className="no-underline">
            <li
              className="text-gray-900 dark:text-gray-300 hover:bg-blue-600 select-none relative py-2 pl-3 pr-9"
              id="listbox-option-0"
            >
              {h.value}
            </li>
          </a>
        ))}
      </ul>
    </>
  );
};

const Note = ({
  partOf,
  mdx,
  inboundReferences,
  outboundReferences,
  title,
  headings,
}) => {
  const AnchorTag = (props) => (
    <components.a {...props} references={outboundReferences} />
  );

  return (
    <>
      {partOf ? (
        <div>
          Part of <LinkToStacked to={partOf.slug}>{partOf.title}</LinkToStacked>
        </div>
      ) : null}
      <header className="flex py-2 sticky top-0  px-4 md:px-8">
        <HeadingButton headings={headings} />
        <span className="font-semibold">{title}</span>
      </header>
      <main className="p-4 md:p-8">
        <MDXProvider components={{ ...components, a: AnchorTag }}>
          <MDXRenderer>{mdx}</MDXRenderer>
        </MDXProvider>
        <ReferencesBlock references={inboundReferences} />
      </main>
    </>
  );
};

export default Note;
