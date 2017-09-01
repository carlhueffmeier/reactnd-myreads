import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const SearchBooksBar = (props) => {
  return (
    <div className="search-books-bar">
      <Link to="/" className="close-search">Close</Link>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title or author"
          value={props.query}
          onChange={(event) => props.onUpdateQuery(event.target.value)}
        />
      </div>
    </div>
  )
}

SearchBooksBar.propTypes = {
  query: PropTypes.string.isRequired,
  onUpdateQuery: PropTypes.func.isRequired
}

export default SearchBooksBar
