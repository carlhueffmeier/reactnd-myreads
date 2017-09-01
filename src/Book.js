import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'
import BookCover from './BookCover'

const Book = (props) => {
  const book = props.book
  const shelf = book.shelf || 'none'
  return (
    <div className='book'>
      <div className='book-top'>
        <BookCover image={book.imageLinks ? book.imageLinks.thumbnail : null} />
        <BookShelfChanger value={shelf} onChange={(newShelf) => props.onMove(book, newShelf)}/>
      </div>
      <div className='book-title'>{book.title}</div>
      <div className='book-authors'>{book.authors ? book.authors.join(', ') : ''}</div>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string
    })
  }),
  onMove: PropTypes.func.isRequired
}

export default Book
