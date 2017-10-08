import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import queryString from 'query-string';
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

  componentDidMount() {
    // Fetch results if a query is present in URL
    const { query } = queryString.parse(this.props.location.search);
    if (query) {
      this.setState({ query });
      this.fetchResults(query);
    }
  }

  onUpdateQuery = newQuery => {
    this.setState({ query: newQuery });
    // Update results if query has the specified minimum length
    if (newQuery.length >= this.props.minQueryLength) {
      this.debouncedUpdateResults(newQuery);
    }
  };

  updateResults(query) {
    // Update Url and start the fetch
    this.updateUrl(query);
    this.fetchResults(query);
  }

  // Debounce to make sure user finished typing
  debouncedUpdateResults = debounce(
    this.updateResults,
    this.props.fetchTimeout,
  );

  updateUrl(query) {
    // Update Url, so users can bookmark and navigate searches
    const newSearch = queryString.stringify({ query });
    // Replace is more intuitive than push here in my opinion
    // I don't want to force the user to push "back" a couple of times
    // in order to return to the start page
    this.props.history.replace({
      search: newSearch,
    });
  }

  fetchResults = query => {
    console.log('Fetching results: ', query);
    // Cancel any pending fetches
    this.cancelFetch();
    // Make the fetch cancelable to allow the component to clean up
    // when it unmounts
    const fetchPromise = makeCancelable(BooksAPI.search(query, 20));
    this.setState({ fetchPromise });
    this.handleFetch(fetchPromise);
  };

  handleFetch = fetchPromise => {
    fetchPromise.promise.then(this.processResults).catch(err => {
      if (!err.isCanceled) {
        console.log(`Could not fetch results: ${err}`);
        this.setState({ searchResults: [] });
      }
    });
  };

  cancelFetch = () => {
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

  componentWillUnmount() {
    // Cancel any async action when unmounting
    this.debouncedUpdateResults.cancel();
    this.cancelFetch();
  }

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

export default withRouter(SearchBooks);
