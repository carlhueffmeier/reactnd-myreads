import React from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ListBooks from 'components/ListBooks';
import SearchBooks from 'components/SearchBooks';
import BookDetails from 'components/BookDetails';
import NotFound from 'components/NotFound';
import './styles.css';

const BooksApp = props => {
  const { location, myBooks, onMove, search, updateSearch, getBook } = props;
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
                  search={search}
                  onUpdate={updateSearch}
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

export default withRouter(BooksApp);
