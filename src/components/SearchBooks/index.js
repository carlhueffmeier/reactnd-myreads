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
    fetching: false,
    fetchPromise: null,
  };

  componentDidMount() {
    // Fetch results if a query is present in URL
    const { query } = queryString.parse(this.props.location.search);
    if (this.props.query !== query) {
      this.props.updateQuery(query || '');
      this.props.updateResults([]);
    }
  }

  componentWillReceiveProps({ query }) {
    // Update results if query has changed
    if (
      query &&
      query !== this.props.query &&
      query.length >= this.props.minQueryLength
    ) {
      this.onQueryChanged();
    }
  }

  // Debounce the fetch to decrease server load
  onQueryChanged = debounce(() => {
    this.updateUrl();
    this.fetchResults();
  }, this.props.fetchTimeout);

  updateUrl() {
    // Update URL, so users can bookmark and navigate searches
    const newSearch = queryString.stringify({ query: this.props.query });
    // Replace is more intuitive than push here in my opinion
    // I don't want to force the user to push "back" a couple of times
    // in order to return to the start page
    this.props.history.replace({
      search: newSearch,
    });
  }

  fetchResults = () => {
    console.log('Fetching results: ', this.props.query);
    // Cancel any pending fetches
    this.cancelFetch();
    // Make the fetch cancelable to allow the component to clean up
    // when it unmounts
    const fetchPromise = makeCancelable(BooksAPI.search(this.props.query, 20));
    this.setState({ fetchPromise });
    this.handleFetch(fetchPromise);
  };

  handleFetch = fetchPromise => {
    this.setState({ fetching: true });
    fetchPromise.promise.then(this.processResults).catch(err => {
      if (!err.isCanceled) {
        console.log(`Could not fetch results: ${err}`);
        this.props.updateResults([]);
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
      this.props.updateResults([]);
    } else {
      this.props.updateResults(response);
    }
  };

  componentWillUnmount() {
    // Cancel any async action when unmounting
    this.debouncedUpdateResults.cancel();
    this.cancelFetch();
  }

  render() {
    const { query, updateQuery, results, myBooks, onMove } = this.props;
    return (
      <div className="search-books">
        <SearchBooksBar query={query} onChange={updateQuery} />
        {this.state.fetching && query.length === 0 ? (
          <Spinner />
        ) : (
          <SearchBooksResults
            results={results}
            myBooks={myBooks}
            onMove={onMove}
          />
        )}
      </div>
    );
  }
}

SearchBooks.propTypes = {
  myBooks: PropTypes.array.isRequired,
  onMove: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  updateQuery: PropTypes.func.isRequired,
  updateResults: PropTypes.func.isRequired,
  minQueryLength: PropTypes.number,
  fetchTimeout: PropTypes.number,
};

SearchBooks.defaultProps = {
  minQueryLength: 2,
  fetchTimeout: 500,
};

export default withRouter(SearchBooks);
