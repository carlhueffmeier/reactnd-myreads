import React, { Component } from 'react'
import SearchBooksBar from './SearchBooksBar'
import SearchBooksResults from './SearchBooksResults'

class SearchBooks extends Component {
  state = {
    query: ''
  }

  onUpdateQuery = (value) => this.setState({ query: value.trim() });

  render() {
    let searchResults = this.props.books || [];
    console.log(this.props.books);
    return (
      <div className="search-books">
        <SearchBooksBar
          query={this.state.query}
          onUpdateQuery={this.onUpdateQuery}
        />
        <SearchBooksResults
          books={searchResults}
        />
      </div>
    );
  }
}

export default SearchBooks
