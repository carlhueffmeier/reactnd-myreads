import React from 'react'
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid'

const SearchBooksResults = (props) => {
  return (
    <div className="search-books-results">
      <BooksGrid books={props.books} />
    </div>
  );
}

SearchBooksResults.propTypes = {
  books: PropTypes.array.isRequired
};

export default SearchBooksResults
