import React from 'react';
import { LinkToStacked } from 'react-stacked-pages-hook';

const Reference = ({ node }) => (
  <li key={node.slug} className="text-blueGray-400 dark:text-blueGray-600">
    <LinkToStacked to={node.slug} className="no-underline">
      <span className="text-base text-indigo-500 hover:text-indigo-800 dark:text-blueGray-300 dark:hover:text-blueGray-100">
        {node.title}
      </span>
      {node.content}
    </LinkToStacked>
  </li>
);

export default Reference;
