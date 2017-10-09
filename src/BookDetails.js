import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BookShelfChanger from './BookShelfChanger';
import BookCover from './BookCover';
import './BookDetails.css';

const BookDetails = props => {
  const { book, shelf, onMove, onClose } = props;
  return (
    <div className="book-details">
      <div className="book-details-content">
        <button className="book-details-close-btn" onClick={onClose}>
          Close
        </button>
        <div className="book-top">
          <BookCover
            image={book.imageLinks ? book.imageLinks.thumbnail : null}
          />
          <BookShelfChanger
            value={shelf}
            onChange={newShelf => onMove(book, newShelf)}
          />
        </div>
        <div className="book-details-info">
          <div className="book-details-info-title">{book.title}</div>
          <div className="book-details-info-detail">
            {book.authors ? book.authors.join(', ') : ''}
          </div>
          <div className="book-details-info-detail">
            {book.publishedDate
              ? `Published ${moment(book.publishedDate).fromNow()}`
              : ''}
          </div>
          <div className="book-details-info-detail">
            {book.pageCount ? `${book.pageCount} pages` : ''}
          </div>
          {book.description && (
            <div className="book-details-info-description">
              <div className="book-details-info-detail">Description</div>
              <div>{book.description}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

BookDetails.propTypes = {
  book: PropTypes.object.isRequired,
  shelf: PropTypes.string.isRequired,
  onMove: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookDetails;
