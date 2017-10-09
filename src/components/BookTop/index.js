import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookshelfChanger from 'components/BookshelfChanger';
import BookCover from 'components/BookCover';
import './styles.css';

const BookTop = props => {
  const { book, onMove } = props;
  return (
    <div className="book-top">
      <Link to={`/details/${book.id}`}>
        <BookCover
          image={book.imageLinks ? book.imageLinks.thumbnail : null}
          title={book.title}
        />
      </Link>
      <BookshelfChanger
        value={book.shelf || 'none'}
        onChange={newShelf => onMove(book, newShelf)}
      />
    </div>
  );
};

BookTop.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
  }),
  onMove: PropTypes.func.isRequired,
};
export default BookTop;
