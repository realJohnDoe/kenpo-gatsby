import { Dialog, Transition } from '@headlessui/react';
import { navigate } from 'gatsby';
import React, { Fragment, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useSearch from '../use-search';

const SearchResult = ({ result }) => {
  const { path, title, excerpt } = result;

  return (
    <li key={path}>
      <button
        type="button"
        onClick={() => navigate(path)}
        className="w-full py-2 rounded-lg text-left no-underline hover:bg-gray-100 dark:hover:bg-gray-700 ring-inset focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <div className="px-4">
          <h4 className="text-gray-700 dark:text-gray-200 text-lg font-semibold">
            {title}
          </h4>
          <span className="text-gray-600 dark:text-gray-400">{excerpt}</span>
        </div>
      </button>
    </li>
  );
};

const SearchPopover = ({ searchVisible, setSearchVisible }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef();

  const results = useSearch(query);
  console.log('results', results);

  return createPortal(
    <Transition.Root show={searchVisible} as={Fragment}>
      <Dialog
        as="div"
        static
        open={searchVisible}
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={inputRef}
        onClose={() => setSearchVisible(false)}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 backdrop-filter backdrop-blur-xl transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="p-2 inline-block align-bottom bg-white dark:bg-gray-800 opacity-95 backdrop-filter backdrop-blur-lg rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-screen-lg m-auto">
              <input
                className="bg-blueGray-100 dark:bg-gray-900 rounded w-full py-4 px-3 text-xl focus:outline-none"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ref={inputRef}
              />
              {results && (
                <div className="my-3">
                  <ul>
                    {results.map((r) => (
                      <SearchResult result={r} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>,
    document.body
  );
};

export default SearchPopover;
