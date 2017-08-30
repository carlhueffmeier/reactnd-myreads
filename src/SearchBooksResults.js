import React from 'react'
import BooksGrid from './BooksGrid'

const SearchBooksResults = (props) => {
  return (
    <div className="search-books-results">
      <BooksGrid books={props.books} />
    </div>
  );
}

export default SearchBooksResults
