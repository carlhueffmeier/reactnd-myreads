import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookshelfChanger from 'components/BookshelfChanger';
import BookCover from 'components/BookCover';
import './styles.css';

const Book = props => {
  const { book } = props;
  const shelf = book.shelf || 'none';
  return (
    <div className="book">
      <div className="book-top">
        <Link to={`/details/${props.book.id}`}>
          <BookCover
            image={book.imageLinks ? book.imageLinks.thumbnail : null}
          />
        </Link>
        <BookshelfChanger
          value={shelf}
          onChange={newShelf => props.onMove(book, newShelf)}
        />
      </div>
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
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
  }),
  onMove: PropTypes.func.isRequired,
};

export default Book;
