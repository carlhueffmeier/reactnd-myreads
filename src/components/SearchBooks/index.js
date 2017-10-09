import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { debounce } from 'lodash';
import { makeCancelable } from 'makeCancelable';
import * as BooksAPI from 'BooksAPI';
import Spinner from 'components/Spinner';
import SearchBooksBar from 'components/SearchBooks/SearchBooksBar';
import SearchBooksResults from 'components/SearchBooks/SearchBooksResults';

class SearchBooks extends Component {
  state = {
    query: '',
    fetching: false,
    fetchPromise: null,
  };

  componentDidMount() {
    // Fetch results if a query is present in URL
    const { query } = queryString.parse(this.props.location.search);
    if (this.props.search.query !== query) {
      this.props.onUpdate({ query: '', results: [] });
    }
    if (query) {
      this.setState({ query }, () => this.fetchResults(this.state.query));
    }
  }

  onUpdateQuery = newQuery => {
    this.setState({ query: newQuery }, () => {
      // Update results if query has the specified minimum length
      if (this.state.query.length >= this.props.minQueryLength) {
        this.debouncedUpdateResults();
      }
    });
  };

  updateResults() {
    this.updateUrl();
    this.fetchResults();
  }

  // Debounce to make sure user finished typing
  debouncedUpdateResults = debounce(
    this.updateResults,
    this.props.fetchTimeout,
  );

  updateUrl() {
    // Update URL, so users can bookmark and navigate searches
    const newSearch = queryString.stringify({ query: this.state.query });
    // Replace is more intuitive than push here in my opinion
    // I don't want to force the user to push "back" a couple of times
    // in order to return to the start page
    this.props.history.replace({
      search: newSearch,
    });
  }

  fetchResults = () => {
    console.log('Fetching results: ', this.state.query);
    // Cancel any pending fetches
    this.cancelFetch();
    // Make the fetch cancelable to allow the component to clean up
    // when it unmounts
    const fetchPromise = makeCancelable(BooksAPI.search(this.state.query, 20));
    this.setState({ fetchPromise });
    this.handleFetch(fetchPromise);
  };

  handleFetch = fetchPromise => {
    this.setState({ fetching: true });
    fetchPromise.promise.then(this.processResults).catch(err => {
      if (!err.isCanceled) {
        console.log(`Could not fetch results: ${err}`);
        this.props.onUpdate({ query: '', results: [] });
        this.setState({ fetching: false });
      }
    });
  };

  cancelFetch = () => {
    if (this.state.fetchPromise) {
      this.state.fetchPromise.cancel();
    }
  };

  processResults = response => {
    this.setState({ fetching: false });
    if (response.error) {
      console.log('No search results: ', response.error);
      this.props.onUpdate({ query: '', results: [] });
    } else {
      this.props.onUpdate({ query: this.state.query, results: response });
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
        {this.state.fetching && this.props.search.results.length === 0 ? (
          <Spinner />
        ) : (
          <SearchBooksResults
            results={this.props.search.results}
            myBooks={this.props.myBooks}
            onMove={this.props.onMove}
          />
        )}
      </div>
    );
  }
}

SearchBooks.propTypes = {
  search: PropTypes.shape({
    query: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired,
  }),
  myBooks: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  minQueryLength: PropTypes.number,
  fetchTimeout: PropTypes.number,
};

SearchBooks.defaultProps = {
  minQueryLength: 2,
  fetchTimeout: 500,
};

export default withRouter(SearchBooks);
