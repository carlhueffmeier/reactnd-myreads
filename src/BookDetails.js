import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BookShelfChanger from './BookShelfChanger';
import BookCover from './BookCover';
import * as BooksAPI from './BooksAPI';
import { makeCancelable } from './makeCancelable';

class BookDetails extends Component {
  state = {
    book: {},
  };

  componentDidMount() {
    const fetchPromise = makeCancelable(BooksAPI.get(this.props.bookId));
    this.setState({ fetchPromise });
    fetchPromise.promise
      .then(result => this.setState({ book: result }))
      .catch(err => {
        if (!err.isCanceled) {
          console.warn(`Error fetching book details: ${err}`);
        }
      });
  }

  componentWillUnmount() {
    if (this.state.fetchPromise) {
      this.state.fetchPromise.cancel();
    }
  }

  render() {
    const book = { ...this.state.book, ...this.props.book };
    const shelf = book.shelf || 'none';
    return (
      <div>
        <div className="book-details">
          <button
            className="book-details-close-btn"
            onClick={this.props.history.goBack}
          >
            Close
          </button>
          <div className="book-top">
            <BookCover
              image={book.imageLinks ? book.imageLinks.thumbnail : null}
            />
            <BookShelfChanger
              value={shelf}
              onChange={newShelf => this.props.onMove(book, newShelf)}
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
  }
}

BookDetails.propTypes = {
  bookId: PropTypes.string.isRequired,
  onMove: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default BookDetails;
