import React from 'react';
import PropTypes from 'prop-types';
import BookTop from 'components/BookTop';
import './styles.css';

const Book = props => {
  const { book, onMove } = props;
  return (
    <div className="book">
      <BookTop book={book} onMove={onMove} />
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors ? book.authors.join(', ') : ''}
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
  }),
  onMove: PropTypes.func.isRequired,
};

export default Book;
