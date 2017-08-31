import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

const ListBooks = (props) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf
            title="Currently Reading"
            books={props.books.filter(({ shelf }) => shelf === "currentlyReading")}
          />
          <Bookshelf
            title="Want to Read"
            books={props.books.filter(({ shelf }) => shelf === "wantToRead")}
          />
          <Bookshelf
            title="Read"
            books={props.books.filter(({ shelf }) => shelf === "read")}
          />
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    </div>
  );
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired
};

export default ListBooks
