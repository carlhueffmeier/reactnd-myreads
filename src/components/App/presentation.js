import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ListBooks from 'components/ListBooks';
import SearchBooks from 'components/SearchBooks';
import BookDetails from 'components/BookDetails';
import NotFound from 'components/NotFound';
import './styles.css';

const BooksApp = props => {
  const {
    location,
    myBooks,
    onMove,
    getBook,
    searchQuery,
    searchResults,
    updateSearchQuery,
    updateSearchResults,
  } = props;
  return (
    <div className="app">
      <TransitionGroup>
        <CSSTransition key={location.pathname} classNames="page" timeout={200}>
          <Switch location={location}>
            <Route
              exact
              path="/"
              render={() => <ListBooks books={myBooks} onMove={onMove} />}
            />
            <Route
              path="/search:query?"
              render={() => (
                <SearchBooks
                  myBooks={myBooks}
                  onMove={onMove}
                  query={searchQuery}
                  updateQuery={updateSearchQuery}
                  results={searchResults}
                  updateResults={updateSearchResults}
                />
              )}
            />
            <Route
              path="/details/:bookId"
              render={({ match }) => (
                <BookDetails
                  bookId={match.params.bookId}
                  book={getBook(match.params.bookId)}
                  onMove={onMove}
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

BooksApp.propTypes = {
  myBooks: PropTypes.array.isRequired,
  onMove: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  searchResults: PropTypes.array.isRequired,
  updateSearchQuery: PropTypes.func.isRequired,
  updateSearchResults: PropTypes.func.isRequired,
};

export default withRouter(BooksApp);
