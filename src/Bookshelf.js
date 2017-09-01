import React from 'react'
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'

const Bookshelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <BooksGrid books={props.books} onMove={props.onMove}/>
      </div>
    </div>
  )
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onMove: PropTypes.func.isRequired
}

export default Bookshelf
