import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import * as BooksAPI from 'BooksAPI';
import { makeCancelable } from 'makeCancelable';
import BookDetails from './presentation';

class BookDetailsContainer extends Component {
  state = {
    book: {},
    closed: false,
  };

  componentDidMount() {
    if (!this.props.book) {
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
  }

  componentWillUnmount() {
    if (this.state.fetchPromise) {
      this.state.fetchPromise.cancel();
    }
  }

  onClose() {
    // A really quick user might click the button twice during animation
    if (!this.state.closed) {
      this.setState({ closed: true });
      this.props.history.goBack();
    }
  }

  render() {
    const book = this.props.book || this.state.book;
    const props = {
      book,
      shelf: book.shelf || 'none',
      onMove: this.props.onMove,
      onClose: this.onClose.bind(this),
    };
    return <BookDetails {...props} />;
  }
}

BookDetailsContainer.propTypes = {
  bookId: PropTypes.string.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default withRouter(BookDetailsContainer);
