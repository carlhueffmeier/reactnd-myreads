import React from 'react';
import { Route } from 'react-router-dom';
import { some } from 'lodash';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import './App.css';

class BooksApp extends React.Component {
  state = {
    myBooks: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then(myBooks => {
      this.setState({ myBooks });
    });
  }

  handleMove = (book, shelf) => {
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
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks books={this.state.myBooks} onMove={this.handleMove} />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <SearchBooks
              myBooks={this.state.myBooks}
              onMove={this.handleMove}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
