import { graphql, useStaticQuery } from 'gatsby';
import React, { memo } from 'react';
import { Disclosure } from '@headlessui/react';

// the plugin gets a root folder for all contents
// e.g. when it ist path/to/notes all files have the prefix /notes
// this function determines the prefix so it can be removed as it is the root folder
function getCommonPrefix(pages) {
  const prefixMap = new Map();

  for (let i = 0; i < pages.length; i += 1) {
    const pathSplit = pages[i].slug.split('/');
    if (pathSplit.length > 1) {
      const prefix = pathSplit[1]; // becuse the slug starts with /

      if (prefixMap.has(prefix)) {
        const count = prefixMap.get(prefix);
        if (count <= 3) {
          prefixMap.set(prefix, count + 1);
        } else {
          // return prefix when found at least 4 times
          return `/${prefix}/`;
        }
      } else {
        prefixMap.set(prefix, 1);
      }
    }
  }

  return null;
}

// returns an object that mimics the path structure of the pages
function getPathStructure(pages) {
  const structure = {};

  // https://stackoverflow.com/questions/18936915/dynamically-set-property-of-nested-object
  const setDeep = ({ displayPath, displayName, linkPath }) => {
    let schema = structure; // a moving reference to internal objects within obj
    const pList = displayPath.split('/');
    const len = pList.length;
    for (let i = 0; i < len - 1; i += 1) {
      const elem = pList[i];
      if (!schema[elem]) schema[elem] = {};
      schema = schema[elem];
    }

    const indexName = pList[len - 1] || '/';
    schema[indexName] = { type: 'file', displayName, linkPath };
  };

  const commonPrefix = getCommonPrefix(pages);

  for (let i = 0; i < pages.length; i += 1) {
    // remove leading /
    const displayPath = pages[i].slug
      .replace(commonPrefix, '')
      .replace(/^\//, '');

    const page = {
      displayPath,
      displayName: pages[i].title,
      linkPath: pages[i].slug,
    };
    setDeep(page);
  }

  return structure;
}

const PageEntriesDisplay = ({ object, title = null }) => {
  const contents = (
    <>
      {Object.keys(object).map((key) => (
        <>
          {'type' in object[key] ? (
            <div>File: {object[key].displayName}</div>
          ) : (
            <PageEntriesDisplay object={object[key]} title={key} />
          )}
        </>
      ))}
    </>
  );

  if (!title) {
    return contents;
  }
  return (
    <Disclosure>
      <Disclosure.Button className="py-2">{title}</Disclosure.Button>
      <Disclosure.Panel className="text-gray-500">{contents}</Disclosure.Panel>
    </Disclosure>
  );
};

const PageList = ({ data }) => {
  const pages = data?.allFile?.nodes?.map(({ fields }) => ({
    slug: fields.slug,
    title: fields.title,
  }));

  const pathStructure = getPathStructure(pages);

  return <PageEntriesDisplay object={pathStructure} />;
};

const MemoPageList = memo(PageList);

const PageIndexSidebar = ({ sideBarOpen }) => {
  const data = useStaticQuery(graphql`
    query allUserSites {
      allFile(filter: { ext: { in: [".md", ".mdx"] } }) {
        nodes {
          fields {
            slug
            title
          }
        }
      }
    }
  `);

  return (
    <div className="flex-shrink-0 bg-skin-popover text-skin-base w-3/4 lg:w-1/2 2xl:w-1/3">
      <MemoPageList data={data} />
      {/* <ul>
        {pages.map(({ title }) => (
          <li key={title}>{title}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default PageIndexSidebar;
