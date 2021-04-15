import { Menu, Transition } from '@headlessui/react';
import { MDXProvider } from '@mdx-js/react';
import React, { Fragment } from 'react';
import { LinkToStacked } from 'react-stacked-pages-hook';
import * as components from './mdx-components';
import MDXRenderer from './mdx-components/mdx-renderer';
import ReferencesBlock from './references-block';

const indentClass = (depth) => (depth - 1) * 2;
const depthStyles = (depth) => {
  switch (depth) {
    case 2:
      return 'font-bold';
    case 3:
      return 'font-semibold';
    default:
      return 'font-light';
  }
};

const HeadingButton = ({ headings }) => {
  const filtertedHeadings = headings.filter((h) => h.depth !== 1);

  if (filtertedHeadings.length === 0) {
    return null;
  }

  return (
    <Menu as="div" className="flex">
      {({ open }) => (
        <>
          <Menu.Button className="align-middle mr-4 px-3 -ml-3 rounded focus:outline-none focus:ring focus:ring-blue-500">
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
          </Menu.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={`origin-top-left absolute left-0 mt-8 ml-2 bg-white dark:bg-gray-900 shadow-lg
        rounded-md py-1 text-base focus:outline-none sm:text-sm`}
            >
              {filtertedHeadings.map((h) => (
                <Menu.Item key={h.value}>
                  {({ active }) => (
                    <a
                      href={`#${h.value}`}
                      className={`${
                        active ? 'bg-white' : null
                      } no-underline focus:outline-nine focus:ring focus:ring-blue-500 hover:bg-blue-600 flex`}
                    >
                      <div className={`pl-2 w-${indentClass(h.depth)}`} />
                      <div
                        className={`text-gray-900 dark:text-gray-300 select-none py-2 pr-9 ${depthStyles(
                          h.depth
                        )}`}
                      >
                        {h.value}
                      </div>
                    </a>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
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
