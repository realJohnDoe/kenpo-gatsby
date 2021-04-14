import { Link } from 'gatsby';
import React from 'react';
import useSiteMetadata from '../use-site-metadata';
import DarkModeToggle from './dark-mode-toggle';
import GraphButton2 from './graph-button2';
import './header.css';
import { Search } from './search';

const Header = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <header className="px-8 w-full flex flex-wrap justify-between items-center">
      <Link to="/">
        <h1 className="text-xl">{siteMetadata.title}</h1>
      </Link>
      <div className="flex space-x-4">
        <Search />
        {/* <GraphButton /> */}
        <GraphButton2 />
        {typeof window !== 'undefined' ? <DarkModeToggle /> : null}
      </div>
    </header>
  );
};

export default Header;
