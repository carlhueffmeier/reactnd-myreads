import React, { Component } from 'react'
import SearchBooksBar from './SearchBooksBar'
import SearchBooksResults from './SearchBooksResults'

class SearchBooks extends Component {
  state = {
    query: ''
  }

  onUpdateQuery = (value) => this.setState({ query: value.trim() });

  render() {
    return (
      <div className="search-books">
        <SearchBooksBar
          query={this.state.query}
          onUpdateQuery={this.onUpdateQuery}
        />
        <SearchBooksResults />
      </div>
    );
  }
}

export default SearchBooks
