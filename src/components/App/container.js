import React, { Component } from 'react';
import { some } from 'lodash';
import * as BooksAPI from 'BooksAPI';
import BooksApp from './presentation';

class BooksAppContainer extends Component {
  /* Below I am storing the search results with the
   * corresponding search query.
   * The reasoning is, that I wanted to prevent an unnecessary
   * fetch, when the user navigates between results and
   * book details. I could come up with three solutions to
   * this problem:
   * 1) Store the state in parent component
   * 2) Make BookDetails a child of SearchBooks component
   * 3) Use or reinvent a global store like Redux
   * 
   * It seems fair to say 3) would be the best option,
   * but I will try to make do without Redux for now.
   * 
   * If there are any best practices for this scenario,
   * I would of course appreciate the advice.
   */
  state = {
    myBooks: [],
    searchQuery: '',
    searchResults: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then(myBooks => {
      this.setState({ myBooks });
    });
  }

  handleMove(book, shelf) {
    BooksAPI.update(book, shelf).then(response => console.log(response));
    // If book is found, replace it.
    // Otherwise add it to the myBooks array.
    this.setState(
      prevState =>
        some(prevState.myBooks, { id: book.id })
          ? {
              myBooks: prevState.myBooks.map(
                someBook =>
                  someBook.id === book.id ? { ...book, shelf } : someBook,
              ),
            }
          : // Book can't be found -> Add it to the array
            { myBooks: prevState.myBooks.concat([{ ...book, shelf }]) },
    );
  }

  getBook(id) {
    return this.state.myBooks
      .concat(this.state.searchResults)
      .find(book => book.id === id);
  }

  updateSearchQuery(query) {
    this.setState({ searchQuery: query });
  }

  updateSearchResults(results) {
    this.setState({ searchResults: results });
  }

  render() {
    console.log('searchQuery:', this.state.searchQuery);
    return (
      <BooksApp
        myBooks={this.state.myBooks}
        searchQuery={this.state.searchQuery}
        searchResults={this.state.searchResults}
        onMove={this.handleMove.bind(this)}
        getBook={this.getBook.bind(this)}
        updateSearchQuery={this.updateSearchQuery.bind(this)}
        updateSearchResults={this.updateSearchResults.bind(this)}
      />
    );
  }
}

export default BooksAppContainer;
