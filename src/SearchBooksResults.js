import React from 'react'
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'

const SearchBooksResults = (props) => {
  return (
    <div className="search-books-results">
      <BooksGrid books={props.books} onMove={props.onMove}/>
    </div>
  )
}

SearchBooksResults.propTypes = {
  books: PropTypes.array.isRequired,
  onMove: PropTypes.func.isRequired
}

export default SearchBooksResults
