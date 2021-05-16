import { Dialog, Transition } from '@headlessui/react';
import { navigate } from 'gatsby';
import React, { Fragment, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useSearchPopover from '../state/useSearchPopover';
import useSearch from '../use-search';

const SearchResult = ({ result }) => {
  const { path, title, excerpt } = result;

  return (
    <li>
      <button
        type="button"
        onClick={() => navigate(path)}
        className="w-full py-2 rounded-lg text-left no-underline hover:bg-skin-popover-hover ring-inset focus:outline-none focus:ring-2 focus:ring-skin-base"
      >
        <div className="px-4">
          <h4 className="text-skin-base text-lg font-semibold">{title}</h4>
          <span className="text-skin-secondary">{excerpt}</span>
        </div>
      </button>
    </li>
  );
};

const SearchPopover = () => {
  const { isOpen, close } = useSearchPopover();
  const [query, setQuery] = useState('');
  const inputRef = useRef();

  const results = useSearch(query);
  console.log('results', results);

  return createPortal(
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        open={isOpen}
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={inputRef}
        onClose={() => close()}
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
            <Dialog.Overlay className="fixed inset-0 backdrop-filter backdrop-blur transition-opacity bg-skin-popover-overlay" />
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
            <div className="p-2 inline-block align-bottom bg-skin-popover opacity-95 backdrop-filter backdrop-blur-lg rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-screen-lg m-auto">
              <input
                className="bg-skin-popover-hover text-skin-base rounded w-full py-4 px-3 text-xl focus:outline-none"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ref={inputRef}
              />
              {results && results.length > 0 && (
                <div className="my-3">
                  <ul>
                    {results.map((r) => (
                      <SearchResult result={r} key={r.path} />
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
