import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import * as BooksAPI from './BooksAPI';
import SearchBooksBar from './SearchBooksBar';
import SearchBooksResults from './SearchBooksResults';
import { makeCancelable } from './makeCancelable';

class SearchBooks extends Component {
  state = {
    query: '',
    searchResults: [],
  };

  onUpdateQuery = newValue => {
    this.setState({ query: newValue });
    if (this.state.query.length >= this.props.minQueryLength) {
      this.debouncedFetch();
    }
  };

  fetchResults = () => {
    console.log('Fetching results: ', this.state.query);
    if (this.state.query.length > 0) {
      this.stopFetching();
      this.setState({
        fetchPromise: makeCancelable(BooksAPI.search(this.state.query, 20)),
      });
      this.startFetching();
    }
  };
  debouncedFetch = debounce(this.fetchResults, this.props.fetchTimeout);

  startFetching = () => {
    this.state.fetchPromise.promise.then(this.processResults).catch(err => {
      if (!err.isCanceled) {
        console.log('Could not fetch results: ', err);
        // TODO: Is there some way to avoid keeping reference to this in callback?
        this.setState({ searchResults: [] });
      }
    });
  };

  stopFetching = () => {
    if (this.state.fetchPromise) {
      this.state.fetchPromise.cancel();
    }
  };

  processResults = response => {
    if (response.error) {
      console.log('No search results: ', response.error);
      this.setState({ searchResults: [] });
    } else {
      this.setState({ searchResults: response });
    }
  };

  // Cancel any async action when unmounting
  componentWillUnmount = () => {
    this.debouncedFetch.cancel();
    this.stopFetching();
  };

  render() {
    return (
      <div className="search-books">
        <SearchBooksBar
          query={this.state.query}
          onChange={this.onUpdateQuery}
        />
        <SearchBooksResults
          results={this.state.searchResults}
          myBooks={this.props.myBooks}
          onMove={this.props.onMove}
        />
      </div>
    );
  }
}

SearchBooks.propTypes = {
  minQueryLength: PropTypes.number,
  fetchTimeout: PropTypes.number,
  onMove: PropTypes.func.isRequired,
  myBooks: PropTypes.array.isRequired,
};

SearchBooks.defaultProps = {
  minQueryLength: 2,
  fetchTimeout: 1000,
};

export default SearchBooks;
