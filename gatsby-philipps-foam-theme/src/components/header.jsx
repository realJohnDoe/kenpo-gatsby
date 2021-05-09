import { Link } from 'gatsby';
import React from 'react';
import useSiteMetadata from '../use-site-metadata';
import DarkModeToggle from './dark-mode-toggle';
import GraphButton2 from './graph-button2';
import SearchButton from './search-button';

const Header = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <header className="pl-4 pr-8 w-full flex flex-wrap justify-between items-center bg-skin-header text-skin-base border-b border-skin-base z-10">
      <Link
        to="/"
        className="no-underline rounded hover:opacity-60 focus:outline-none focus:ring focus:ring-skin-base px-4"
      >
        <h1 className="text-xl">{siteMetadata.title}</h1>
      </Link>
      <div className="flex space-x-4">
        <SearchButton />
        <GraphButton2 />
        {typeof window !== 'undefined' ? <DarkModeToggle /> : null}
      </div>
    </header>
  );
};

export default Header;
