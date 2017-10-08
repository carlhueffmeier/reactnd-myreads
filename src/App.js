import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { some } from 'lodash';

import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import BookDetails from './BookDetails';
import NotFound from './NotFound';
import './App.css';

class BooksApp extends Component {
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
        <Switch>
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
          <Route
            path="/bookDetails/:bookId"
            render={({ match }) => (
              <BookDetails
                bookId={match.params.bookId}
                onMove={this.handleMove}
                history={this.props.history}
              />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
