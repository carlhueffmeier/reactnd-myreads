import React from 'react'
import SearchBooksBar from './SearchBooksBar'
import SearchBooksResults from './SearchBooksResults'

const SearchBooks = (props) => {
  return (
    <div className="search-books">
      <SearchBooksBar
        query=''
      />
      <SearchBooksResults />
    </div>
  );
}

export default SearchBooks
