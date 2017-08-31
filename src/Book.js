import React from 'react'
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger'
import BookCover from './BookCover'

const Book = (props) => {
  const shelf = props.shelf || 'none';
  return (
    <div className="book">
      <div className="book-top">
        <BookCover image={props.imageLinks ? props.imageLinks.thumbnail : null} />
        <BookShelfChanger value={shelf} onChange={(event) => {console.log(event.target.value);}}/>
      </div>
      <div className="book-title">{props.title}</div>
      <div className="book-authors">{props.authors ? props.authors.join(', ') : ''}</div>
    </div>
  );
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array,
  imageLinks: PropTypes.shape({
    thumbnail: PropTypes.string
  }),
};

export default Book
