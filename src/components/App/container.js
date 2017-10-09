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
    search: { query: '', results: [] },
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

  updateSearch(update) {
    this.setState({
      search: {
        ...this.state.search,
        ...update,
      },
    });
  }

  getBook(id) {
    return this.state.myBooks
      .concat(this.state.search.results)
      .find(book => book.id === id);
  }

  render() {
    return (
      <BooksApp
        myBooks={this.state.myBooks}
        search={this.state.search}
        updateSearch={this.updateSearch.bind(this)}
        onMove={this.handleMove.bind(this)}
        getBook={this.getBook.bind(this)}
      />
    );
  }
}

export default BooksAppContainer;
