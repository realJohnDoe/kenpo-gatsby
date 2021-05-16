import { useWindowWidth } from '@react-hook/window-size';
import React, { memo } from 'react';
import {
  StackedPagesProvider,
  useStackedPagesProvider,
} from 'react-stacked-pages-hook';
import useKeyboardListeners from '../hooks/useKeyboardListeners';
import { dataToNote } from '../utils/data-to-note';
import './custom.css';
import Header from './header';
import Note from './note';
import NoteWrapper from './note-wrapper';
import SEO from './seo';
import './stacked-layout.css';
import './theme.css';

const Content = ({ windowWidth, scrollContainer, stackedPages, index }) => {
  useKeyboardListeners();

  return (
    <div className="layout">
      <SEO title={stackedPages[stackedPages.length - 1].data.title} />
      <Header />
      <div className="note-columns-scrolling-container" ref={scrollContainer}>
        <div
          className="note-columns-container"
          style={{ width: 625 * (stackedPages.length + 1) }}
        >
          {stackedPages.map((page, i) => (
            <NoteWrapper
              key={page.slug}
              i={typeof index !== 'undefined' ? index : i}
              slug={page.slug}
              title={page.data.title}
            >
              <Note
                title={page.data.title}
                mdx={page.data.mdx}
                inboundReferences={page.data.inboundReferences}
                outboundReferences={page.data.outboundReferences}
                headings={page.data.headings}
              />
            </NoteWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};
const MemoContent = memo(Content);

const NotesLayout = ({ location, slug, data }) => {
  const windowWidth = useWindowWidth();

  const [state, scrollContainer] = useStackedPagesProvider({
    firstPage: { slug: data?.file?.fields?.slug, data },
    location,
    processPageQuery: dataToNote,
    pageWidth: 625,
  });

  let pages = state.stackedPages;
  let activeIndex;
  if (windowWidth <= 800) {
    const activeSlug = Object.keys(state.stackedPageStates).find(
      (slug) => state.stackedPageStates[slug].active
    );
    activeIndex = state.stackedPages.findIndex(
      (page) => page.slug === activeSlug
    );
    if (activeIndex === -1) {
      activeIndex = state.stackedPages.length - 1;
    }

    pages = [state.stackedPages[activeIndex]];
  }

  return (
    <StackedPagesProvider value={state}>
      <MemoContent
        windowWidth={windowWidth}
        scrollContainer={scrollContainer}
        stackedPages={pages}
        index={activeIndex}
      />
    </StackedPagesProvider>
  );
};

export default NotesLayout;
