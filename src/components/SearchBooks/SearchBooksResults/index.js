import React from 'react';
import PropTypes from 'prop-types';
import BooksGrid from 'components/BooksGrid';
import RestoredScroll from 'components/RestoredScroll';
import './styles.css';

const SearchBooksResults = props => {
  // If the book is in one of my shelfs, return the book with shelf info instead
  const mergeShelfState = () =>
    props.results.map(
      result => props.myBooks.find(myBook => myBook.id === result.id) || result,
    );

  return (
    <RestoredScroll className="search-books-results">
      <BooksGrid onMove={props.onMove} books={mergeShelfState()} />
    </RestoredScroll>
  );
};

SearchBooksResults.propTypes = {
  results: PropTypes.array.isRequired,
  myBooks: PropTypes.array.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default SearchBooksResults;
